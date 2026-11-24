# Nguyen Quang Huy — Portfolio

Personal portfolio built with React 18, React Router 6 and Tailwind CSS (Create React App).

## Run

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build in ./build
```

## Structure

```
src/
  data/profile.js        # ALL content (about, experience, awards, certificates, projects, skills, schools)
  layouts/               # MainLayout (sidebar + footer, persistent) and StudyLayout (tab bar)
  components/layout/     # SideBar, TopBar, BottomBar
  components/ui/         # Section, Stats, Card, TagList, Carousel
  hooks/                 # useCarousel, useScrollOnNavigate
  pages/                 # route pages; render data only
public/images/           # optimized photos (max 1600px)
```

To update the portfolio, edit `src/data/profile.js` and drop images into `public/images/`.

## Live channel stats (`/api/social-stats`)

The "Giải Mã Toán Olympic" project card shows live followers, views and engagements from
TikTok, YouTube and Facebook. A Vercel serverless function (`api/`) calls the official APIs
with server-side credentials and caches the result at the edge for 2 minutes; the page polls it
every 5 minutes. Platforms without credentials are skipped, and the block stays hidden until
live data arrives (so `npm start`, which doesn't serve `/api`, shows nothing — use `npx vercel dev`).

| Platform | Source | Freshness |
|---|---|---|
| YouTube | Data API v3 (`channels`, `playlistItems`, `videos`) with an API key | near real time; subscribers rounded to 3 significant figures |
| TikTok | Display API v2 (`user/info`, `video/list`) via OAuth | near real time |
| Facebook | Graph API Page fields (`followers_count`, `/videos` views, likes, comments) | near real time (Page Insights are skipped: Meta refreshes them every 24h) |

Setup — all values go into Vercel → Settings → Environment Variables, never into the code (see `.env.example`):

1. **YouTube:** Google Cloud → enable *YouTube Data API v3* → create an API key restricted to that API → `YOUTUBE_API_KEY`.
2. **Facebook:** Meta app (use case *Manage everything on your Page*) with `pages_show_list` + `pages_read_engagement`; Graph API Explorer → extend the user token in the Access Token Debugger → take the Page token from `me/accounts` (it does not expire) → `FACEBOOK_ACCESS_TOKEN`; Graph Page ID → `FACEBOOK_PAGE_ID`.
3. **Redis:** Vercel → Storage/Marketplace → Upstash Redis → connect to the project (adds `KV_REST_API_URL`, `KV_REST_API_TOKEN`).
4. **TikTok:** developers.tiktok.com app with Login Kit and scopes `user.info.basic`, `user.info.stats`, `video.list`; redirect URI `https://<domain>/api/tiktok/callback` → `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`; set `ADMIN_SECRET`.
   After deploying, open `https://<domain>/api/tiktok/login?key=<ADMIN_SECRET>` once and approve. Tokens are stored and rotated in Redis automatically.

## Channel dashboard (`/channel`)

A full page on top of the same endpoint: filter by platform (or all), KPI tiles, a growth chart,
the platform split, a sortable per-video table and progress toward each monetization program.

- **History:** the platform APIs only return current totals, so `/api/social-stats` (and the daily
  keepalive cron) keep one snapshot per day (Vietnam time) in the Redis hash `social:daily`. The
  growth chart starts from the first snapshot.
- **Monetization:** thresholds live in `src/data/monetization.js`, copied from YouTube Studio → Earn,
  TikTok Studio → Monetization and Meta Business Suite → Monetization. Subscriber, follower and upload
  counts are live; qualified Shorts views and watch hours exist only in YouTube Studio, so they are
  stored with the date they were read. Update `CHECKED_ON` and those values when re-reading.
