import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ message: 'Missing required fields: name, email, phone' });
    }

    // IMPORTANT: Configure these environment variables in your Vercel project settings
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use an "App Password" for Gmail
      },
    });

    const mailOptions = {
      from: `"Cabinet Hassar Site" <${process.env.EMAIL_USER}>`,
      to: 'avocatehassar@gmail.com', // The email address that will receive the notifications
      subject: 'Nouvelle demande de rappel',
      html: `
        <h3>Nouvelle demande de rappel :</h3>
        <ul>
          <li><strong>Nom :</strong> ${name}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Sujet :</strong> ${message || 'Non spécifié'}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ status: 'success', message: 'Request sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to send request.' });
  }
}
