# anti-src

Source for the `/anti` experiment — the repo's first framework-based
folder. Everything else in karma-site is plain static HTML; this one
needs a build because [ekmas/neobrutalism-components][nb] is a
Tailwind + shadcn-style React component set.

## Working on it

```bash
npm install
npm run dev
```

The dev server serves at `/anti/` (that's `base` in `vite.config.ts`),
so the dev URL is `http://localhost:5173/anti/`.

## Building

```bash
npm run build
```

`build.outDir` is `../anti`, so this writes straight into the folder
the site serves, and `emptyOutDir` clears stale hashed assets first.
**Commit `/anti` along with your source change** — nothing builds on
deploy, so what's committed is what ships.

## Components

`src/components/ui/` holds four components vendored from [ekmas/neobrutalism-components][nb]
(MIT): `button`, `card`, `badge`, `switch`. They're copied in rather
than installed, shadcn-style, so they can be edited freely — the
borders here were thickened from `border-2` to `border-4`.

Those files are written against theme tokens (`bg-main`,
`shadow-shadow`, `translate-x-boxShadowX`, `rounded-base`, …), which
`src/index.css` defines. Keep the token *names* if you add more
components from upstream; the *values* are ours.

[nb]: https://github.com/ekmas/neobrutalism-components
