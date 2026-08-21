# karma-site

A single static site hosting a set of independent front-end experiments,
served from one Vercel domain via path-based routing. There is no shared
app, no monorepo tooling, and no build step at the root.

## Structure

```
/index.html        the entrance (shoji sliding-door animation) — do not touch
/sketchbook/        experiment, static
/lab/                experiment, static
/gazete/             experiment, static (placeholder, content later)
```

Each top-level folder is a **fully self-contained mini-project**. Nothing
is shared between them — no shared CSS, no shared JS, no shared
`node_modules`. An experiment folder should be deletable or replaceable
without touching anything else in the repo.

The root `index.html` is the entrance animation and links to each
experiment by its path (`/sketchbook/`, `/lab/`, `/gazete/`). Keep those
paths stable — if you rename a folder, update the link in the root
`index.html` too.

## Adding a new experiment

Pick a top-level folder name (e.g. `/playground`) and decide whether it
needs a build step.

### Static (plain HTML / p5.js / three.js via CDN or vendored files)

This is the default. Most experiments should be this.

1. Create the folder: `/playground/`
2. Drop in an `index.html` that uses **relative** paths for its own
   assets (`./sketch.js`, `./style.css`, not `/style.css`) so the folder
   works if it's ever moved or zipped up standalone.
3. Nothing else to configure — Vercel serves the folder as-is, and a
   request to `/playground/` resolves to `/playground/index.html`
   automatically.

### Framework-based (Vite, or anything with a build step)

Use this only when a static page genuinely isn't enough (e.g. you want
React/Svelte/TypeScript tooling for one experiment).

1. Scaffold the experiment in its own folder, e.g. `/lab/` — the Vite
   project's source lives here (or in a `src/` subfolder if you prefer,
   as long as the build output still lands in `/lab/`).
2. In `vite.config.*`, set `base` to the folder's public path:
   ```js
   export default {
     base: '/lab/',
     build: {
       outDir: '.', // or wherever you want the build to land
     },
   }
   ```
3. Build locally (`npm run build`) and **commit the built output** into
   that same folder. This repo does not run a build step on deploy —
   what's committed is what's served.
4. If you keep source and build output in the same folder, add a
   `.gitignore`/`.vercelignore` only for things like `node_modules/`;
   the built `index.html`, JS, and CSS must stay tracked.

Either way, the experiment must be reachable at `/<folder-name>/` with
its own `index.html` at the root of that folder.

## Deploying to Vercel

This is a static site — no framework preset, no root build command.
Each top-level folder with an `index.html` is automatically served at
its own path (`/sketchbook/index.html` → `https://yourdomain.com/sketchbook/`),
so path-based routing works out of the box without a `vercel.json`.

### Connect this repo to Vercel (single domain)

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. In the [Vercel dashboard](https://vercel.com/new), import the repo.
3. Framework preset: **Other** (no build step).
   - Build Command: leave empty (or `None`)
   - Output Directory: leave as the repo root (`.`)
   - Install Command: leave empty
4. Deploy. Vercel will serve `/index.html` at the domain root and every
   subfolder's `index.html` at its matching path automatically.
5. In **Project Settings → Domains**, attach your custom domain (or keep
   the `*.vercel.app` one) — everything lives under that single domain,
   with each experiment just a path on it.

No `vercel.json` is checked in because there's nothing to configure:
static folder + `index.html` = a route, for free. If a future
experiment needs custom headers, redirects, or clean URLs beyond the
default static behavior, add a `vercel.json` then — scoped to that need,
not preemptively.
