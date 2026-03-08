import * as fs from 'node:fs'
import * as path from 'node:path'

function wait(delayInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayInMs)
  })
}

// see src/App.tsx for roots
const pagesForPreRendering = ['/', '/docs', '/maps', '/mods', '/pocs', '/tools']

const distPath = path.resolve('dist')

const template = fs.readFileSync(path.resolve(distPath, 'client/index.html'), 'utf-8')

async function generatePage(route) {
  const cleanRoute = route.replaceAll('?', '_').replaceAll('%20', '-') // Replace "?" with "_" for filenames

  const { render } = await import('./dist/server/entry-server.js')

  const html = render(route)

  // clone the template with template.html [this file if that page not required SSG then SSR will use]
  if (route === '/') {
    const filePath = path.join(`${distPath}/client`, 'template.html')
    console.log(`✅ Generated: ${filePath}`)
    fs.writeFileSync(filePath, template, 'utf-8')
  }

  const head = html.slice(html.indexOf('<head>') + 6, html.indexOf('</head>'))
  const body = html.slice(head.length + '<head>'.length + '</head>'.length)

  // Inject head and body content properly
  const outputHtml = template.replace('<!-- head -->', head).replace('<!-- body -->', body)

  let filePath
  if (route === '/') {
    filePath = path.join(`${distPath}/client`, 'index.html')
  } else {
    filePath = path.join(`${distPath}/client`, `${cleanRoute}/index.html`)
  }

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
  }

  fs.writeFileSync(filePath, outputHtml, 'utf-8')
  console.log(`✅ Generated: ${filePath}`)
}

async function generatePagesSequentially() {
  for (const route of pagesForPreRendering) {
    await generatePage(route)
    await wait(100)
  }
}

generatePagesSequentially()
