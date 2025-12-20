import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('#root not found in DOM')
}

hydrateRoot(
  root,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
