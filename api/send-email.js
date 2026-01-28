import { GoogleGenAI } from "@google/genai";
import nodemailer from 'nodemailer';
import { google } from 'googleapis';



async function generateGeminiText(prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error("Gemini API error");
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}



export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send({ message: 'POST only' });

  const { nom, email, details, secteur, budget, delai, telephone } = req.body;

  try {
    // --- ÉTAPE 1 : GÉNÉRATION DU TEXTE PAR L'IA (Gemini 3 Flash) ---
    const prompt = `
Tu es Faradji Régis, gérant de Rex Solutions. Ton expertise est l'importation de véhicules de prestige et de matériaux industriels.

CLIENT : ${nom}
RECHERCHE : ${details}
SECTEUR : ${secteur}
BUDGET : ${budget}
DÉLAI : ${delai}

CONTEXTE : Le client vient de soumettre son dossier sur ton site web.
TON : 
- Ultra-professionnel, expert et minimaliste.
- Pas de fioritures, concentre-toi sur la valeur ajoutée de Rex Solutions.
- Utilise le "nous" ou le "je".
- La réponse doit faire entre 2 et 3 phrases.

OBJECTIF : 
1. Accuser réception avec élégance.
2. Valoriser le projet du client.
3. Confirmer que tu lances l'analyse de faisabilité immédiatement.

DIRECTIVES STRICTES : 
- Ne jamais inventer de prix.
- Ne pas mettre d'objet de mail.
- Ne pas signer.
- Langue : Français impeccable.
`;
    
    const aiResponse = await generateGeminiText(prompt);

    // --- ÉTAPE 2 : CONFIGURATION GMAIL (OAuth2) ---
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
    
    oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
    
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'rexsolutionspro@gmail.com',
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // --- ÉTAPE 3 : ENVOI DU MAIL AU CLIENT ---
    const clientMailOptions = {
      from: `"Faradji Régis - Rex Solutions" <rexsolutionspro@gmail.com>`,
      to: email,
      subject: `Votre projet ${details} - Rex Solutions`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #f0f0f0; padding: 40px; line-height: 1.6;">
          <h2 style="font-weight: 800; letter-spacing: -0.02em; text-transform: uppercase;">Rex Solutions</h2>
          <p>Bonjour ${nom},</p>
          
          <div style="font-style: italic; border-left: 3px solid #000; padding-left: 20px; margin: 30px 0; color: #444;">
            ${aiResponse}
          </div>

          <p>Je reviens vers vous très prochainement avec une proposition concrète.</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-weight: bold;">Faradji Régis</p>
            <p style="margin: 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.1em;">Gérant • Rex Solutions</p>
          </div>
        </div>
      `,
    };

    // --- ÉTAPE 4 : NOTIFICATION POUR RÉGIS (ADMIN) ---
    const adminMailOptions = {
      from: `"Système Rex Solutions" <rexsolutionspro@gmail.com>`,
      to: 'rexsolutionspro@gmail.com',
      subject: `NOUVEAU DOSSIER : ${nom} (${secteur})`,
      html: `
        <h3>Nouveau dossier de recherche</h3>
        <ul>
          <li><strong>Nom :</strong> ${nom}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Tél :</strong> ${telephone}</li>
          <li><strong>Secteur :</strong> ${secteur}</li>
          <li><strong>Modèle/Détails :</strong> ${details}</li>
          <li><strong>Budget :</strong> ${budget}</li>
          <li><strong>Délai :</strong> ${delai}</li>
        </ul>
      `
    };

    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);

    return res.status(200).json({ success: true });

  } catch (error) {
  console.error("SEND EMAIL ERROR:", error);
  return res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
  }
}
