import type { FC } from 'react'
import './Header.css'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  return (
    <header>
      <img src="/arx-fatalis-logo.webp" alt="Arx Fatalis logo" />
      <h1>Arx Fatalis Maps, Mods and Modding Tools</h1>

      <nav className="breadcrumbs">
        You are here:
        <ul>{/* TODO */}</ul>
      </nav>
    </header>
  )
}
