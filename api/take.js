const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const number = await kv.incr('counter');
  const serving = (await kv.get('serving')) || 0;
  res.status(200).json({ number, counter: number, serving });
};
