import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { prenom, nom, email, phone, date, heure, projet } = req.body;

    if (!prenom || !nom || !email || !phone || !date || !heure || !projet) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["rexsolutionspro@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande d’audit stratégique – ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 12px;">
            
            <h2 style="margin-bottom: 20px;">Nouvelle Demande d’Audit Stratégique</h2>
            <hr style="margin-bottom: 20px;" />

            <p><strong>Nom :</strong> ${prenom} ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Date souhaitée :</strong> ${date}</p>
            <p><strong>Heure :</strong> ${heure}</p>

            <hr style="margin: 25px 0;" />

            <p><strong>Description du projet :</strong></p>
            <p style="background:#f4f4f4;padding:15px;border-radius:8px;">
              ${projet}
            </p>

          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("RESEND AUDIT ERROR:", error);
    return res.status(500).json({ message: "Email failed" });
  }
}
