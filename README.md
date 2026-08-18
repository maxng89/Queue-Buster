# Take a Number — queue app (simple static + serverless)

No framework, no build step. Just:

- `index.html` — customer page (put behind your door QR code)
- `admin.html` — counter board (password-gated)
- `api/*.js` — four tiny serverless functions that read/write the shared
  queue state in Vercel KV

## Deploy

1. Push this folder to a GitHub repo, then **Import Project** in Vercel
   (no framework preset needed — Vercel auto-detects static + `/api`).
2. **Storage tab → Create Database → KV** and connect it to the project.
   This sets `KV_REST_API_URL` / `KV_REST_API_TOKEN` automatically.
3. **Settings → Environment Variables → add `ADMIN_PASSWORD`.**
4. Redeploy. Point your door QR at `https://your-project.vercel.app/` and
   open `https://your-project.vercel.app/admin.html` on the counter screen.

That's it — three settings, zero config files.

## Local testing

`vercel dev` (requires the Vercel CLI and a linked project so it can pull
the KV env vars). There's no separate local fallback mode in this version —
it always talks to real KV, so link it to your Vercel project's dev
environment first (`vercel link`, then `vercel env pull`).

## How the admin password works

`admin.html` prompts once and stores what you type in that browser's
`localStorage`. It's only actually checked server-side, inside `api/next.js`
and `api/reset.js`, the moment you press a button — if it's wrong you get a
"Wrong password" alert and are re-prompted. Simple, no cookies, no sessions.
Good enough for keeping casual customers off the board; not real
multi-admin access control.
