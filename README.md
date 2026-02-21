# Magnetosphere.ru — Planetary Space Weather Service

Web application for **planetary space weather**: Earth, Saturn, Jupiter, and Mercury. Built with Next.js 14, consumes a Paramod backend for data and Ghost CMS for blog/news.

## Features

- **Earth**: 2D/3D visualizations, alerts, description pages (with optional UTS-based routes).
- **Other planets**: Saturn (2D + description), Jupiter and Mercury description pages.
- **i18n**: Russian and English via [Lingui](https://lingui.dev/) (extract/compile workflow).
- **Blog**: Posts from Ghost filtered by tag `magnetosphere-ru` (Content API v3 or legacy v0.1).
- **Charts**: Highcharts for data visualization; Bootstrap/Reactstrap for UI.

## Tech stack

- **Runtime**: Node 20
- **Framework**: Next.js 14 (App Router), React 18
- **UI**: Bootstrap 4, Reactstrap, Font Awesome
- **Charts**: Highcharts, react-highcharts
- **i18n**: Lingui (macros + compile)
- **Deploy**: Docker (multi-stage build), Nginx as reverse proxy

## Project structure (main)

- `app/` — App Router: `[lang]/` for localized routes, `api/ghost/posts` for Ghost proxy.
- `components/` — Shared React components (Header, MenuBar, charts, etc.).
- `locales/` — Lingui message catalogs (e.g. `ru/messages.js`, `en/messages.js`).
- `next.config.js` — `output: "standalone"`, rewrites for Ghost `/content/images/`.
- `docker-compose.yml` — `web` (Next) + `nginx`; `.env` for secrets.

## Environment variables

| Variable | Purpose |
|----------|--------|
| `BACKEND_URL` | Paramod API base (e.g. `http://downloader.sinp.msu.ru:8888/api/v1/`) |
| `GHOST_URL` | Ghost instance URL |
| `GHOST_CONTENT_API_KEY` | Ghost Content API v3 key, or |
| `GHOST_CLIENT_ID` / `GHOST_CLIENT_SECRET` | Ghost API v0.1 auth |

Optional: `NEXT_PUBLIC_GHOST_BASE_URL` for Ghost image URLs in the frontend.

## Scripts

```bash
npm run dev      # Next dev server
npm run build    # Next production build
npm run start    # Next production server
npm run lint     # ESLint
# Lingui
npm run add-locale <locale>
npm run extract
npm run compile
```

## Run with Docker

```bash
docker compose up --build
```

App: Next.js on port 3000 (internal); Nginx exposes ports 80 and 8888.

## License

Private project.
