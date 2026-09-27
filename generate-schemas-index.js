import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

// Generates the index page of the schemas which are served (https://arx-tools.github.io/schemas/).
// GitHub Pages has no directory index, so without this file the folder answers with a 404 even
// though the schemas themselves are there.
//
// The page is generated at build time from the committed copies in public/schemas, so a schema
// added to that folder shows up by itself - there is no listing to keep in sync by hand.
//
// The schemas themselves come from arx-convert (https://github.com/arx-tools/arx-convert):
// "npm run schemas:build" writes them into dist/schemas, from where they are copied into
// public/schemas after a release which changed one (see docs/schemas.md of arx-convert).

const schemasPath = path.resolve('public/schemas')
const outputPath = path.resolve('dist/client/schemas/index.html')
const schemaSuffix = '.schema.json'
const convertRepoUrl = 'https://github.com/arx-tools/arx-convert'
const websiteRepoUrl = 'https://github.com/arx-tools/arx-tools.github.io'

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
}

async function readSchema(filename) {
  const content = await readFile(path.join(schemasPath, filename), 'utf8')
  const schema = JSON.parse(content)

  return {
    filename,
    title: typeof schema.title === 'string' ? schema.title : filename,
    description: typeof schema.description === 'string' ? schema.description : '',
    generatedBy: typeof schema['x-generatedBy'] === 'string' ? schema['x-generatedBy'] : 'unknown',
  }
}

function renderSchema(schema) {
  return `        <li>
          <a href="./${escapeHtml(schema.filename)}">${escapeHtml(schema.title)}</a>
          <span>${escapeHtml(schema.description)}</span>
          <span class="meta">${escapeHtml(schema.filename)} &middot; ${escapeHtml(schema.generatedBy)}</span>
        </li>`
}

function renderPage(schemas) {
  const items = schemas.map(renderSchema).join('\n')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <title>JSON schemas - Arx Fatalis Maps, Mods and Modding Tools</title>
    <meta
      name="description"
      content="The JSON schemas of the JSON that arx-convert generates from the custom formats of Arx Fatalis"
    />
    <link rel="canonical" href="https://arx-tools.github.io/schemas/" />
    <style>
      :root {
        --smoky-black: hsl(16, 58%, 4%);
        --walnut-brown: hsl(42, 12%, 37%);
        --kobicha: hsl(27, 48%, 26%);
        --cornsilk: hsl(44, 88%, 90%);
      }
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      body {
        font-family: sans-serif;
        font-size: 1.1em;
        color: var(--cornsilk);
        display: flex;
        flex-direction: column;
      }
      header {
        background: url('/arx-bg-pattern.webp') repeat-x center center var(--kobicha);
        background-size: cover;
        padding: 10px 30px;
        border-bottom: 1px solid var(--cornsilk);
      }
      header img {
        float: right;
        width: auto;
        height: 48px;
        margin-top: 29px;
      }
      @media (max-width: 725px) {
        header img {
          display: none;
        }
      }
      h1,
      h2,
      h3 {
        margin: 30px 0 20px 0;
        font-family: serif;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
      }
      h3 {
        margin-top: 50px;
      }
      a {
        font-weight: bold;
        color: var(--cornsilk);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .breadcrumbs {
        font-size: 0.8rem;
        user-select: none;
      }
      .breadcrumbs ul {
        margin: 0;
        padding: 0;
        display: inline-block;
        font-size: 0;
      }
      .breadcrumbs ul li {
        list-style: none;
        display: inline-block;
        font-size: 0.8rem;
        font-weight: bold;
      }
      .breadcrumbs ul li::before {
        content: '/';
        margin: 0 5px;
      }
      .breadcrumbs ul li:first-child::before {
        content: none;
      }
      main {
        flex: 1;
        background: url('/arx-bg-image.webp') no-repeat center center var(--walnut-brown);
        background-size: cover;
      }
      main > div {
        width: min(800px, 100%);
        margin: 0 auto;
        padding: 0 10px 40px 10px;
        box-sizing: border-box;
      }
      .back {
        margin: 0 0 30px 0;
      }
      .schemas {
        margin: 30px 0;
        padding: 0;
      }
      .schemas li {
        list-style: none;
        margin-bottom: 10px;
        padding: 10px 15px;
        border-radius: 2px;
        background: var(--cornsilk);
        color: var(--smoky-black);
      }
      .schemas li:hover {
        background: var(--kobicha);
        color: var(--cornsilk);
      }
      .schemas li a {
        font-size: 1.2em;
        color: var(--smoky-black);
      }
      .schemas li:hover a {
        color: var(--cornsilk);
      }
      .schemas li span {
        display: block;
        margin-top: 5px;
      }
      .meta {
        font-size: 0.8rem;
        font-style: italic;
        opacity: 0.75;
      }
      code {
        background: var(--smoky-black);
        color: var(--cornsilk);
        padding: 0 3px;
        border-radius: 3px;
      }
      pre {
        background: var(--smoky-black);
        border: 1px solid var(--walnut-brown);
        border-radius: 3px;
        padding: 10px;
        overflow-x: auto;
      }
      pre code {
        background: none;
        padding: 0;
      }
      footer {
        background: url('/arx-bg-pattern.webp') repeat-x center center var(--kobicha);
        background-size: cover;
        padding: 10px 30px;
        border-top: 1px solid var(--cornsilk);
        font-size: 0.8rem;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <header>
      <img src="/arx-fatalis-logo.webp" alt="Arx Fatalis logo" />
      <h1>Arx Fatalis Maps, Mods and Modding Tools</h1>

      <nav class="breadcrumbs">
        You are here:
        <ul>
          <li><a href="/">Home</a></li>
          <li>JSON schemas</li>
        </ul>
      </nav>
    </header>

    <main>
      <div>
        <h2>JSON schemas</h2>
        <p class="back"><a href="/">&laquo; back to homepage</a></p>

        <p>
          Every custom format of Arx Fatalis which <a href="${convertRepoUrl}" target="_blank">arx-convert</a> can read
          has a JSON schema: it describes the JSON that the tool generates from the binary file, so the result can be
          validated and edited with completion in an editor. The schemas are self-contained
          <a href="https://json-schema.org/draft/2020-12/schema" target="_blank">draft 2020-12</a> documents - every
          definition they reference is included in the file - so they can be used on their own.
        </p>

        <p>
          This folder is the copy which the <code>$schema</code> key of the generated JSON resolves to. The files are
          written by <code>npm run schemas:build</code> of arx-convert and refreshed here after a release which changed
          one; the <code>x-generatedBy</code> of a file tells which release it came from. This listing is generated at
          build time from the folder, so it can not go stale.
        </p>

        <ul class="schemas">
${items}
        </ul>

        <h3>Using a schema</h3>

        <p>A JSON file written by arx-convert names the URL of its schema:</p>

        <pre><code>{
  "$schema": "https://arx-tools.github.io/schemas/fts.schema.json",
  "header": { ... }
}</code></pre>

        <p>
          Editors which resolve <code>$schema</code> (VS Code and most of the JSON tooling) give completion and inline
          validation for the file with that URL. The schemas can also be passed to a validator by hand, for example
          with <a href="https://github.com/ajv-validator/ajv-cli" target="_blank">ajv-cli</a> - the
          <code>--strict=false</code> is needed for the <code>x-generatedBy</code> annotation the generator adds:
        </p>

        <pre><code>cat level8.fts.unpacked | arx-convert --from=fts --to=json &gt; level8.json
npx ajv-cli@5 validate --spec=draft2020 --strict=false -s fts.schema.json -d level8.json</code></pre>
      </div>
    </main>

    <footer>
      The schemas are generated by
      <a href="${convertRepoUrl}" target="_blank">arx-convert</a>, this page by the build of the
      <a href="${websiteRepoUrl}" target="_blank">website&nbsp;source</a>.
    </footer>
  </body>
</html>
`
}

async function main() {
  const entries = await readdir(schemasPath)
  const filenames = entries.filter((filename) => filename.endsWith(schemaSuffix)).sort()
  const schemas = await Promise.all(filenames.map(readSchema))

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, renderPage(schemas), 'utf8')

  console.log(`✅ Generated: ${outputPath} (${schemas.length} schemas)`)
}

await main()
