import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const pixel_id = "1378726347206975";
  const access_token = process.env.META_ACCESS_TOKEN;

  if (!access_token) {
    return res.status(500).json({ error: "Missing META_ACCESS_TOKEN" });
  }

  // REQUIRED — lowercase email before hashing
  const hashedEmail = crypto
    .createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: "https://cohold-waitlist.vercel.app/",
        user_data: {
          em: [hashedEmail],
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixel_id}/events?access_token=${access_token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("📡 Meta CAPI Response:", data);

    return res.status(200).json({ success: true, response: data });
  } catch (error) {
    console.error("❌ Meta CAPI error:", error);
    return res.status(500).json({ error: "CAPI failed", details: error });
  }
}
