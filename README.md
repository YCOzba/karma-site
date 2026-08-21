# karma-site

A single static site hosting a set of independent front-end experiments,
served from one Vercel domain via path-based routing. There is no shared
app, no monorepo tooling, and no build step at the root.

## Structure

```
/index.html      the entrance (shoji sliding-door animation) — do not touch
/sketchbook/     experiment, static
/lab/            experiment, static
/gazete/         experiment, static (placeholder, content later)
/anti/           experiment, BUILT OUTPUT — do not edit by hand
/anti-src/       source for /anti (Vite + React + Tailwind)
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

Use this only when a static page genuinely isn't enough — e.g. `/anti`,
which pulls in a Tailwind + React component library. `/anti` is the
worked example for everything below.

**Source and output live in two folders, not one:** `/<name>-src` holds
the project, `/<name>` holds only what it builds. Keeping them apart
means the served folder never carries `package.json`, config, or source,
and "delete the folder to delete the experiment" still roughly holds.

1. Scaffold into the `-src` folder:
   ```bash
   npm create vite@latest anti-src -- --template react-ts
   cd anti-src && npm install
   ```
2. Point `base` at the public subpath and `outDir` at the served folder:
   ```ts
   // anti-src/vite.config.ts
   export default defineConfig({
     base: '/anti/',                    // every asset URL gets this prefix
     build: { outDir: '../anti', emptyOutDir: true },
   })
   ```
   `base` is the part people forget: without it the built HTML asks for
   `/assets/…` and 404s, because the page is served from `/anti/`, not
   the domain root. `emptyOutDir` clears stale hashed assets so old
   bundles don't pile up in git.
3. Build, and **commit the output together with the source change**:
   ```bash
   npm run build      # writes ../anti
   ```
   Nothing builds on deploy — what's committed is what ships. If you
   change source and forget to rebuild, the live site keeps serving the
   previous bundle with no warning.
4. `node_modules/` is already covered by the root `.gitignore`. Do not
   ignore the built `index.html`/`assets/` — those must stay tracked.

Either way, the experiment must be reachable at `/<folder-name>/` with
its own `index.html` at the root of that folder.

#### Borrowing shadcn-style components

`/anti` vendors four components from `ekmas/neobrutalism-components`
(MIT) by copying the `.tsx` files in rather than installing a package —
that's how shadcn-style libraries are meant to be used, and it makes
them editable. They're written against theme tokens (`bg-main`,
`shadow-shadow`, `rounded-base`, `translate-x-boxShadowX`, …) that the
project's own CSS has to define, or the classes silently resolve to
nothing. See `anti-src/README.md`.

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

`.vercelignore` keeps `-src` folders out of the deployment — they're how
the built output is made, not something the site needs to serve.

No `vercel.json` is checked in because there's nothing to configure:
static folder + `index.html` = a route, for free. If a future
experiment needs custom headers, redirects, or clean URLs beyond the
default static behavior, add a `vercel.json` then — scoped to that need,
not preemptively.
