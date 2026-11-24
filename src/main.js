import './style.css';
import { getWeather } from './weather.js';

const DEFAULT_CITY = 'Tunis';

const form = document.querySelector('#search');
const input = document.querySelector('#city');
const card = document.querySelector('#card');
const message = document.querySelector('#message');

function showMessage(text, isError = false) {
  message.textContent = text;
  message.className = isError ? 'message error' : 'message';
  message.hidden = !text;
}

function render(weather) {
  if (weather.temperature === null || !weather.condition) {
    card.hidden = true;
    showMessage('Almost there! The API works, but TODO 2 is not done yet: open src/weather.js.', true);
    return;
  }

  card.querySelector('.city').textContent = weather.city;
  card.querySelector('.country').textContent = weather.country;
  card.querySelector('.temperature').textContent = `${Math.round(weather.temperature)}°C`;
  card.querySelector('.condition').textContent = weather.condition;

  const slot = card.querySelector('.icon-slot');
  slot.replaceChildren();
  if (weather.icon) {
    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.src = weather.icon;
    icon.alt = weather.condition;
    slot.append(icon);
  }

  card.hidden = false;
  showMessage('');
}

async function search(city) {
  showMessage(`Looking up the weather in ${city}…`);
  card.hidden = true;
  try {
    render(await getWeather(city));
  } catch (err) {
    showMessage(err.message, true);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (city) search(city);
});

input.value = DEFAULT_CITY;
search(DEFAULT_CITY);
