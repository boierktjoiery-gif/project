// netlify/functions/notify-telegram.js

const TELEGRAM_BOT = process.env.TELEGRAM_BOT;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { text } = JSON.parse(event.body);
    if (!text) return { statusCode: 400, body: 'No text' };

    // Use native fetch (no need for node-fetch!)
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
      }
    );
    const resJson = await response.json();
    if (!resJson.ok) throw new Error(JSON.stringify(resJson));
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
