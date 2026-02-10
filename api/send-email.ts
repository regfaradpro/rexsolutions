import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, model, budget, delay, sector } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await resend.emails.send({
      from: "Rex Solutions <onboarding@resend.dev>",
      to: ["rexsolutionspro@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande de devis – ${sector}`,
      html: `
        <h2>Nouvelle demande de devis – ${sector}</h2>
        <hr />
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Recherche :</strong> ${model}</p>
        <p><strong>Budget :</strong> ${budget}</p>
        <p><strong>Délai :</strong> ${delay}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    return res.status(500).json({ message: "Email failed" });
  }
}
