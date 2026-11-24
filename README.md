# Weather Dashboard: your first real deployment

A team built a weather dashboard. It's almost done: the configuration is missing, it isn't connected to real weather data, and it isn't online.

**Your mission:** understand it, configure it, connect it to WeatherAPI, and deploy it on Vercel. At the end you'll have a public link you can open on your phone.

Built for **Software Dev 101**, IEEE ENSI CS SBC.

---

## Before you start

- A **GitHub** account
- A **Vercel** account (sign up with GitHub: https://vercel.com/signup)
- A **WeatherAPI** key (free): https://www.weatherapi.com/signup.aspx. Confirm your email; a new key can take a few minutes to activate.
- On your laptop: **Git** and **Node.js 20.19 or newer** (`node -v`).
  No setup, or something fails? Use **GitHub Codespaces** (step 1, option B): everything runs in the browser.

When you finish a step, post ✅ in your room's chat. Stuck for more than 3 minutes? Post 🆘 with your error.

---

## Step 1: Get the project

1. On this repository, click **Use this template → Create a new repository**.
   Name it `weather-dashboard`, keep it **Public**, create it. It's your own copy, so you can push to it.
2. Then choose one option:

**Option A, on your laptop**

```bash
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git
cd weather-dashboard
npm install
```

**Option B, in the browser**
On *your* repository: **Code → Codespaces → Create codespace on main**. `npm install` runs automatically.

## Step 2: Understand the project

```
weather-dashboard/
├── index.html        the page (HTML)
├── src/
│   ├── main.js       search box + display (frontend)
│   ├── weather.js    calls our backend, TODO 2 is here
│   └── style.css     the look (CSS)
├── api/
│   └── weather.js    the backend: a serverless function, TODO 1 is here
├── public/           static files (icon)
├── package.json      dependencies and scripts (npm run dev)
├── .env.example      the configuration the project needs, WITHOUT the real values
└── .gitignore        files Git must never track
```

Remember the restaurant: `src/` is the customer (frontend), `api/` is the waiter (it talks to WeatherAPI for us).

## Step 3: Environment variables

```bash
cp .env.example .env
```

On Windows Command Prompt: `copy .env.example .env`

Open `.env` and paste your key:

```
WEATHER_API_KEY=abc123yourkey
```

No quotes, no spaces. Then check:

```bash
git status
```

✅ `.env` must **not** appear in the list. It's in `.gitignore`, so Git pretends it doesn't exist. That's security rule 1: never commit secrets.

## Step 4: Connect the weather API

Start the app:

```bash
npm run dev
```

Open http://localhost:5173. The page tells you what's missing. Fix the two TODOs; the page reloads by itself.

**TODO 1, in `api/weather.js`:** build the WeatherAPI URL.
Protocol + domain `https://api.weatherapi.com`, path `/v1/current.json`, query `key=...&q=...`. (Block 3: anatomy of a URL!)

**TODO 2, in `src/weather.js`:** pick the right fields from the JSON (country, temperature, condition, icon).

✅ Search **Tunis**: you see the temperature, the condition and an icon.

> 🔐 **Where is your key?** Your browser only talks to `/api/weather`. The function talks to WeatherAPI with the key, on the server. The key never reaches the browser.
> And in Vite, any variable starting with `VITE_` ends up in the browser code, visible to everyone. That's why our key has no `VITE_` prefix and lives in `api/`.

## Step 5: Deploy on Vercel

1. Commit and push:

   ```bash
   git add .
   git commit -m "Connect weather API"
   git push
   ```

   Run `git status` once more: `.env` was not committed.
2. On https://vercel.com: **Add New → Project → Import** `weather-dashboard`.
3. ⚠️ **Before clicking Deploy:** open **Environment Variables** and add `WEATHER_API_KEY` with your key.
4. Click **Deploy**, wait about a minute, open your public URL.

Why add the key again? Your `.env` stayed on your laptop (Git ignored it). Vercel is another computer, production: it needs its own copy of the secret.

## Step 6: Show it off

Open your Vercel link **on your phone**, search a city, and post the link in the chat. 🎉

---

## Troubleshooting

| You see | Fix |
| --- | --- |
| `WEATHER_API_KEY is missing` (on your laptop) | Create `.env` from `.env.example` (step 3), then restart `npm run dev`. |
| `WEATHER_API_KEY is missing` (on Vercel) | Settings → Environment Variables → add it, then **Deployments → ⋯ → Redeploy**. Variables only apply to new deployments. |
| `API key is invalid` / 401 / 403 | Copy the key again from your WeatherAPI dashboard. A brand-new key can take a few minutes to activate. |
| `No matching location found` / 400 | Check the city name, and that the URL uses `q=`. |
| `TODO 1 is not done yet` | Build the URL in `api/weather.js`. |
| `TODO 2 is not done yet` | Fill in the fields in `src/weather.js`. |
| `git push` asks for a password | Use Codespaces, or log in with `gh auth login`. Last resort: `npx vercel` deploys from your laptop without pushing. |
| `npm run dev` fails with a Node version error | Install Node 20.19+ (https://nodejs.org), or use Codespaces. |

## Finished early?

- Change the default city in `src/main.js`, push: Vercel redeploys by itself.
- Add a card for humidity (`current.humidity`) or wind (`current.wind_kph`).
- Make it yours in `src/style.css`.
