export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const query = typeof request.query.q === 'string' ? request.query.q.trim() : '';
  const apiKey = process.env.KLIPY_API_KEY;

  if (!query || !apiKey) {
    response.status(400).json({ error: 'Search query and KLIPY_API_KEY are required' });
    return;
  }

  const url = new URL('https://api.klipy.com/v2/search');
  url.searchParams.set('q', query);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('client_key', 'loopline');
  url.searchParams.set('limit', '5');
  url.searchParams.set('media_filter', 'gif');

  const klipyResponse = await fetch(url);
  const payload = await klipyResponse.json();
  response.status(klipyResponse.status).json(payload);
}
