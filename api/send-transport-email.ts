import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      nomComplet,
      email,
      phone,
      marchandise,
      depart,
      destination,
      date,
      details
    } = req.body;

    if (!nomComplet || !email || !phone || !marchandise || !depart || !destination || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", // ⚠️ domaine vérifié recommandé
      to: ["rexsolutionspro@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande transport – ${depart} ➝ ${destination}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
          <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;">
            
            <h2>Demande de Devis Transport</h2>
            <hr style="margin:20px 0;" />

            <p><strong>Nom :</strong> ${nomComplet}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>

            <hr style="margin:25px 0;" />

            <p><strong>Marchandise :</strong> ${marchandise}</p>
            <p><strong>Départ :</strong> ${depart}</p>
            <p><strong>Destination :</strong> ${destination}</p>
            <p><strong>Date souhaitée :</strong> ${date}</p>

            <hr style="margin:25px 0;" />

            <p><strong>Détails complémentaires :</strong></p>
            <p style="background:#f4f4f4;padding:15px;border-radius:8px;">
              ${details || "Aucun détail supplémentaire"}
            </p>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("TRANSPORT EMAIL ERROR:", error);
    return res.status(500).json({ message: "Email failed" });
  }
}
