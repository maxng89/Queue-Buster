const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password.' });
  }
  const counter = (await kv.get('counter')) || 0;
  const serving = (await kv.get('serving')) || 0;
  const nextServing = Math.min(serving + 1, counter);
  await kv.set('serving', nextServing);
  res.status(200).json({ counter, serving: nextServing });
};
