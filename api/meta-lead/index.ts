import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Your Pixel ID
  const pixel_id = '1378726347206975';
  // Your Meta Access Token
  const access_token = process.env.META_ACCESS_TOKEN;

  const eventPayload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://cohold-waitlist.vercel.app/',
        user_data: {
          em: email ? [sha256(email)] : [],
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixel_id}/events?access_token=${access_token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      }
    );

    const json = await response.json();
    return res.status(200).json(json);

  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong', details: error });
  }
}

// Hashing function required by Meta
import crypto from 'crypto';
function sha256(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}
