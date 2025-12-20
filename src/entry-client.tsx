import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './styles.css'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('#root not found in DOM')
}

hydrateRoot(
  root,
  <StrictMode>
    <App />
  </StrictMode>,
)
