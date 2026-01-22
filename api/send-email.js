import nodemailer from 'nodemailer';
import { google } from 'googleapis';

export default async function handler(req, res) {
  // 1. Autoriser uniquement les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Seules les requêtes POST sont autorisées' });
  }

  const { nom, email, telephone, details, budget, delai, secteur } = req.body;

  try {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'rexsolutionspro@gmail.com', // Votre adresse Gmail
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Rex Solutions Web <rexsolutionspro@gmail.com>`,
      to: 'rexsolutionspro@gmail.com', // Où vous recevez les leads
      replyTo: email, // Permet de répondre directement au client
      subject: `[IMPORT] Nouveau Dossier : ${secteur} - ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="background: #000; color: #fff; padding: 10px; text-align: center;">NOUVELLE DEMANDE DE DEVIS</h2>
          <p><strong>Secteur :</strong> ${secteur}</p>
          <hr />
          <p><strong>Client :</strong> ${nom}</p>
          <p><strong>E-mail :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${telephone}</p>
          <p><strong>Modèle recherché :</strong> ${details}</p>
          <p><strong>Budget estimé :</strong> ${budget}</p>
          <p><strong>Délai souhaité :</strong> ${delai}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "E-mail envoyé avec succès" });

  } catch (error) {
    console.error("Erreur API Gmail:", error);
    return res.status(500).json({ message: "Erreur lors de l'envoi", error: error.message });
  }
}