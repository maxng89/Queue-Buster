const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password.' });
  }
  await Promise.all([kv.set('counter', 0), kv.set('serving', 0)]);
  res.status(200).json({ counter: 0, serving: 0 });
};
