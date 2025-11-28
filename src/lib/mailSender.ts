import nodemailer from "nodemailer";
interface MailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendMail({ to, subject, text, html }: MailOptions) {
  try {
    if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) {
      throw new Error(
        "Email server or sender not configured in environment variables"
      );
    }

    // Parse SMTP credentials from EMAIL_SERVER
    const smtpUrl = new URL(process.env.EMAIL_SERVER);

    const transporter = nodemailer.createTransport({
      host: smtpUrl.hostname,
      port: Number(smtpUrl.port),
      secure: Number(smtpUrl.port) === 465,
      auth: {
        user: decodeURIComponent(smtpUrl.username),
        pass: decodeURIComponent(smtpUrl.password),
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
