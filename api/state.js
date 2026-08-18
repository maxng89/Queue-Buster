const { kv } = require('@vercel/kv');

module.exports = async (req, res) => {
  const [counter, serving] = await Promise.all([
    kv.get('counter'),
    kv.get('serving'),
  ]);
  res.status(200).json({ counter: counter || 0, serving: serving || 0 });
};
