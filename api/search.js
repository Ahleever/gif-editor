export default async function handler(request, response) {
  const origin = request.headers.origin;
  const allowedOrigins = new Set([
    'https://ahleever.github.io',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
  ]);
  response.setHeader(
    'Access-Control-Allow-Origin',
    origin && allowedOrigins.has(origin) ? origin : 'https://ahleever.github.io',
  );
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.status(204).end();
    return;
  }

  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const discover = request.query.discover === '1';
  const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';
  const position = typeof request.query.pos === 'string' ? request.query.pos : '';
  const limit = typeof request.query.limit === 'string' ? request.query.limit : '50';
  const apiKey = process.env.KLIPY_API_KEY;

  if ((!query && !discover) || !apiKey) {
    response.status(400).json({ error: 'Search query or discover mode and KLIPY_API_KEY are required' });
    return;
  }

  const url = new URL('https://api.klipy.com/v2/search');
  url.searchParams.set('q', discover ? 'trending' : query);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('client_key', 'loopline');
  url.searchParams.set('limit', limit);
  url.searchParams.set('media_filter', 'gif');
  if (discover) url.searchParams.set('random', 'true');
  if (position) url.searchParams.set('pos', position);

  const klipyResponse = await fetch(url);
  const payload = await klipyResponse.json();
  response.status(klipyResponse.status).json(payload);
}
