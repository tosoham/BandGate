# Deploying BandGate

Two pieces:

- **Frontend** → **Vercel** (Next.js, the `frontend/` directory)
- **Backend** → **Render** (FastAPI in Docker, `backend/Dockerfile` via `render.yaml`)

> **Order matters.** The frontend needs the backend's public URL as an env var, so
> deploy the **backend first**, copy its `https://…onrender.com` URL, then deploy the
> frontend with that URL. (You can also create the Vercel project first and just set
> the URL once Render is live — a Vercel redeploy is instant.)

---

## 1. Backend → Render (Docker)

Render reads `render.yaml` (a Blueprint) from the repo root.

1. Push the repo to GitHub (already on `github.com/tosoham/BandGate`).
2. Render dashboard → **New → Blueprint** → connect the repo → it detects `render.yaml`
   and proposes the `bandgate-backend` web service.
3. It will ask for the two **secret** env vars (they're `sync:false` in the blueprint):
   - `AIML_API_KEY`
   - `FEATHERLESS_API_KEY`
4. **Create** → Render builds `backend/Dockerfile` (context = repo root) and starts it.
   - The container binds Render's injected `$PORT` (Dockerfile fix), health-checks `/health`.
   - First build is a few minutes (installs `band-sdk[langgraph]` etc.).
5. When live, note the URL, e.g. `https://bandgate-backend.onrender.com`.

**Verify:**
```bash
curl https://bandgate-backend.onrender.com/health        # {"status":"ok",...}
curl https://bandgate-backend.onrender.com/providers      # aiml_model, featherless_model, modes
```

### Plan note
`render.yaml` sets `plan: free`. Free **spins down after ~15 min idle** (first request
after that is a slow cold start) and is 512 MB RAM. For a judged demo, switch to
`plan: starter` (always-on) in `render.yaml` or the dashboard.

---

## 2. Frontend → Vercel (Next.js)

1. Vercel dashboard → **Add New → Project** → import the same GitHub repo.
2. **Root Directory: `frontend`** (important — the Next app is in a subfolder).
   Framework auto-detects as Next.js; build = `next build`, output handled by Vercel.
3. **Environment Variables** (Production + Preview) — both point at the Render URL:

   | Key | Value |
   |---|---|
   | `BACKEND_URL` | `https://bandgate-backend.onrender.com` |
   | `NEXT_PUBLIC_BACKEND_URL` | `https://bandgate-backend.onrender.com` |

   `BACKEND_URL` is used server-side (server components, the `/api/auth/*` routes);
   `NEXT_PUBLIC_BACKEND_URL` is used in the browser (live deliberation, SSE stream, upload).
4. **Deploy.** Open the Vercel URL → login (`demo` / any email) → Intake → upload a
   questionnaire → the pipeline streams from the Render backend.

---

## How the pieces talk (already wired, no code changes)

- Backend CORS is `allow_origins=["*"]`, no credentials — cross-origin calls from the
  Vercel domain work (the backend has no cookie auth; auth cookies are set by Vercel's
  own `/api/auth/*` routes).
- The browser opens the **SSE stream directly against Render** (`NEXT_PUBLIC_BACKEND_URL`),
  not through Vercel — so Vercel's function timeouts don't affect live streaming.

---

## Caveats (be aware for the demo)

- **State is in-memory.** A backend restart / free-tier spin-down loses pending
  deliberations and the loaded questionnaire — just re-upload. Use `plan: starter` to
  avoid idle spin-down.
- **RAG runs in keyword-fallback mode.** `output/embedding_index.json` is gitignored and
  not built in `lazy` boot, so Security retrieval uses keyword overlap instead of vector
  search. Fine for the demo; ask if you want a boot-time index build added.
- **Live Band room is off** (`BAND_MODE=lite`) because `agent_config.yaml` isn't in the
  image. The canonical JSONL event log + SSE stream still drive the whole UI. To enable
  live Band, add `agent_config.yaml` as a Render secret file and set `BAND_MODE=live`.
- **Featherless concurrency = 1** (V4-Pro uses the whole plan limit). Adversarial reviews
  queue; that's expected.
