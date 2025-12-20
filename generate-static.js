import * as fs from 'node:fs'
import * as path from 'node:path'

function wait(delayInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, delayInMs)
  })
}

const pagesForPreRendering = ['/']

const distPath = path.resolve('dist')

const template = fs.readFileSync(path.resolve(distPath, 'client/index.html'), 'utf-8')

async function generatePage(route) {
  const cleanRoute = route.replaceAll('?', '_').replaceAll('%20', '-') // Replace "?" with "_" for filenames

  const { render } = await import('./dist/server/entry-server.js')

  const html = await render(route)

  // clone the template with template.html [this file if that page not required SSG then SSR will use]
  if (route === '/') {
    const filePath = path.join(`${distPath}/client`, 'template.html')
    console.log(`✅ Generated: ${filePath}`)
    fs.writeFileSync(filePath, template, 'utf-8')
  }

  // Inject head and body content properly
  const outputHtml = template.replace('<!-- head -->', html.head ?? '').replace('<!-- body -->', html.html ?? '')

  // Ensure directory exists before writing file
  const outputDir = path.join(`${distPath}/client`, path.dirname(cleanRoute))
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true }) // Create parent directories if needed
  }

  const filePath = path.join(`${distPath}/client`, route === '/' ? 'index.html' : `${cleanRoute}.html`)

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
