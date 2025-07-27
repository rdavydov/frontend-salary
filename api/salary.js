// api/salary.js
// Ultra-light serverless function – zero deps
export default async function handler(req, res) {
  const spec = Array.isArray(req.query.spec_aliases)
    ? req.query.spec_aliases[0]
    : req.query.spec_aliases || 'frontend';

  const url =
    'https://career.habr.com/api/frontend_v1/salary_calculator/general_graph' +
    `?spec_aliases[]=${encodeURIComponent(spec)}`;

  try {
    const r = await fetch(url, { timeout: 5000 });
    if (!r.ok) throw new Error(r.status);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'proxy error' });
  }
}
