import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // We only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const formData = req.body;
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    // Check if the access key is configured in Vercel environment variables
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not set in environment variables.");
      return res.status(500).json({ status: 'error', message: "Le serveur de messagerie n'est pas configuré." });
    }

    // Append the access key from environment variables to the form data
    const dataWithKey = {
      ...formData,
      access_key: accessKey,
    };

    // Forward the request to Web3Forms API
    const web3FormsResponse = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(dataWithKey),
    });

    const result = await web3FormsResponse.json();

    // Handle the response from Web3Forms
    if (result.success) {
      return res.status(200).json({ status: 'success', message: 'Message sent successfully!' });
    } else {
      console.error("Error from Web3Forms:", result);
      return res.status(500).json({ status: 'error', message: result.message || 'Failed to send message.' });
    }

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ status: 'error', message: 'An internal server error occurred.' });
  }
}
