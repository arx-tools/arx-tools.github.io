import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'

export function render(_url: string): { html: string } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={`/${_url}`}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )

  return { html }
}
