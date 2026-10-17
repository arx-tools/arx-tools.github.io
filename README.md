# arx-tools.github.io

The website promoting all the tools out there for modding Arx Fatalis

https://arx-tools.github.io

## Technical stuff

A static, pre-rendered [Astro](https://astro.build) site. There is no runtime server and no
client side framework: the build turns every page into HTML and the only JavaScript which reaches
the browser is the editor, which is a separate project (see [the editor](#the-editor) below).

| command           | what it does                                               |
| ----------------- | ---------------------------------------------------------- |
| `npm ci`          | installs the dependencies                                  |
| `npm run dev`     | dev server on http://localhost:4321, with hot reload       |
| `npm run build`   | typecheck (`astro check`) and build the static site        |
| `npm run preview` | serves the content of `dist/` as it would be in production |
| `npm run format`  | formats the sources with prettier                          |

`.github/workflows/build-and-deploy.yml` runs `npm ci` and `npm run build` on every push to
`main`, and uploads `dist/` to GitHub Pages. The same build runs on a laptop, so what you see
locally is what goes live.

## Branches

`main` is the deployed state, `dev` is where the development happens. A release is a `dev` ->
`main` merge: the deploy runs on the push to `main`, so the site goes live with the merge.

The commits of the two other repositories land directly on `main` - they are releases of the
things this site serves, not development:

| commit comes from                      | what it puts here |
| -------------------------------------- | ----------------- |
| `arx-tools/arx-fatalis-browser-editor` | `public/editor/`  |
| `arx-tools/arx-convert`                | `public/schemas/` |

Both are written by the release workflow of the source repository (a tag or a GitHub release),
never by hand.

## Content

The content of the pages is data, so adding a map, a mod or a tool does not mean touching a
component:

| file                  | what it is                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| `src/data/maps.json`  | the maps and the proof of concept maps, `isPOC` decides which page shows them |
| `src/data/mods.json`  | the mods, grouped by category (`vanilla fix`, `challenge`, `meme`, `other`)   |
| `src/data/tools.json` | the tools of the `/tools/` page                                               |

`src/data/index.ts` validates all three with [zod](https://zod.dev) at build time: a missing
field, a mistyped category or a link which is not a URL fails the build instead of silently
dropping an item from a page.

| directory         | what it is                                                            |
| ----------------- | --------------------------------------------------------------------- |
| `src/pages/`      | the pages, one file per route (`/maps/` is `maps.astro`)              |
| `src/components/` | the header, the footer and the pieces the pages are built from        |
| `src/layouts/`    | the `<head>` of every page: title, description, Open Graph, canonical |
| `src/styles/`     | the CSS, imported once by the layout                                  |
| `public/`         | files which are served as they are (images, favicon, robots.txt)      |

`public/schemas/` is special: `/schemas/` is a page of the site (`src/pages/schemas/index.astro`)
which lists the schemas of the folder at build time, so a schema which arrives by a release shows
up in the listing without any other change.

## The editor

`public/editor/` is a copy of the released build of
[arx-fatalis-browser-editor](https://github.com/arx-tools/arx-fatalis-browser-editor), served
under `/editor/`. It is not part of the Astro build and not edited here: the release workflow of
that repository writes the folder, and the editor owns its own `index.html`.

## The schemas

`public/schemas/` is the copy of `dist/schemas` of
[arx-convert](https://github.com/arx-tools/arx-convert) which the `$schema` key of the generated
JSON resolves to. The files are written by `npm run schemas:build` of arx-convert, and the release
workflow of that repository copies them here; the `x-generatedBy` of a file tells which release it
came from.
