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
      typeProjet,
      message
    } = req.body;

    if (!nomComplet || !email || !phone || !typeProjet) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await resend.emails.send({
      from: "Rex Solutions <contact@rexsolutions.be>",
      to: ["rexsolutionspro@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande installation – ${typeProjet}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:30px;">
          <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;">
            
            <h2>Demande de Devis Installation</h2>
            <hr style="margin:20px 0;" />

            <p><strong>Nom :</strong> ${nomComplet}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Type d'installation :</strong> ${typeProjet}</p>

            <hr style="margin:25px 0;" />

            <p><strong>Message / Détails :</strong></p>
            <p style="background:#f4f4f4;padding:15px;border-radius:8px;">
              ${message || "Aucun détail supplémentaire"}
            </p>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("INSTALLATION EMAIL ERROR:", error);
    return res.status(500).json({ message: "Email failed" });
  }
}
