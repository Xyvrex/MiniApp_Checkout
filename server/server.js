// A small API that reuses the checkout logic from src/checkout.js
// No extra packages needed: it uses Node's built-in http module.
const http = require('http');
const { TAX_RATE, calculateTotal } = require('../src/checkout.js');

function send(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');

  if (pathname === '/health') {
    if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
    return send(res, 200, { status: 'ok' });
  }

  if (pathname === '/checkout') {
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

    let body;
    try {
      body = await readJson(req);
    } catch {
      return send(res, 400, { error: 'Request body must be valid JSON' });
    }

    const { subtotal } = body;
    if (subtotal === undefined) {
      return send(res, 400, { error: 'subtotal is required' });
    }
    if (typeof subtotal !== 'number' || Number.isNaN(subtotal)) {
      return send(res, 400, { error: 'subtotal must be a number' });
    }
    if (subtotal < 0) {
      return send(res, 400, { error: 'subtotal must not be negative' });
    }

    const total = calculateTotal(subtotal);
    const tax = Math.round((total - subtotal) * 100) / 100;
    return send(res, 200, { subtotal, taxRate: TAX_RATE, tax, total });
  }

  return send(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Checkout API running at http://localhost:${port}`));
}

module.exports = server;
