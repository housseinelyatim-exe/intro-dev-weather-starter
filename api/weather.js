// This file runs on the SERVER (a Vercel serverless function), never in the browser.
// It is the waiter from the restaurant: the browser asks it for the weather,
// and it asks WeatherAPI, using the secret key that only the server knows.

export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = req.query.city || 'Tunis';

  if (!apiKey) {
    return res.status(500).json({
      error:
        'WEATHER_API_KEY is missing. On your laptop: create .env from .env.example. On Vercel: add it in Settings → Environment Variables, then redeploy.',
    });
  }

  // TODO 1: build the WeatherAPI URL.
  //
  // Endpoint docs: https://www.weatherapi.com/docs/ ("Current weather").
  // A URL has 4 parts (Block 3!):
  //   protocol + domain : https://api.weatherapi.com
  //   path              : /v1/current.json
  //   query             : key=<your API key> and q=<the city>
  //
  // Hint: use a template string `...${apiKey}...`
  // Hint: wrap the city in encodeURIComponent(city), for names with spaces like "Sidi Bou Said".
  const url = '';

  if (!url) {
    return res.status(501).json({ error: 'TODO 1 is not done yet: build the WeatherAPI URL in api/weather.js' });
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      // WeatherAPI tells us what went wrong: 401/403 = key problem, 400 = city not found.
      return res.status(response.status).json({ error: data?.error?.message || 'WeatherAPI returned an error.' });
    }

    return res.status(200).json(data);
  } catch {
    return res.status(502).json({ error: 'Could not reach WeatherAPI. Check your internet connection.' });
  }
}
