import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ ok: true, message: "API send-email is alive" });
  }

  try {
    const { name, email, phone, model, budget, delay } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Rex Solutions" <${process.env.GMAIL_USER}>`,
      to: "rexsolutionspro@gmail.com",
      subject: "Nouvelle demande de devis",
      html: `
        <h2>Nouvelle demande</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Modèle :</strong> ${model}</p>
        <p><strong>Budget :</strong> ${budget}</p>
        <p><strong>Délai :</strong> ${delay}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      ok: false,
      message: "Email failed",
      error: error.message,
    });
  }
}
