// Frontend code: this runs in the browser.
// It talks to OUR backend (/api/weather), never directly to WeatherAPI,
// so the browser never sees the API key.

export async function getWeather(city) {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return toCard(data);
}

// TODO 2: pick the right fields from the WeatherAPI JSON.
//
// The JSON looks like this (simplified):
// {
//   "location": { "name": "Tunis", "country": "Tunisia", ... },
//   "current":  { "temp_c": 19.3, "humidity": 64,
//                 "condition": { "text": "Partly cloudy", "icon": "//cdn.weatherapi.com/..." }, ... }
// }
//
// The first field is done for you. Fill in the others the same way.
export function toCard(data) {
  return {
    city: data.location.name,
    country: '', // inside data.location
    temperature: null, // inside data.current, in °C
    condition: '', // inside data.current.condition
    icon: '', // inside data.current.condition. It starts with "//": add "https:" in front.
  };
}
