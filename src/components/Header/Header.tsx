import type { FC } from 'react'
import { Link } from 'react-router'
import './Header.css'

type HeaderProps = {
  breadcrumbs: Array<{ link: string; label: string }>
}

export const Header: FC<HeaderProps> = ({ breadcrumbs }) => {
  return (
    <header>
      <img src="/arx-fatalis-logo.webp" alt="Arx Fatalis logo" />
      <h1>Arx Fatalis Maps, Mods and Modding Tools</h1>

      <nav className="breadcrumbs">
        You are here:{' '}
        <ul>
          {breadcrumbs.map(({ link, label }, index, all) => {
            const isCurrent = index === all.length - 1
            if (isCurrent) {
              return <li>{label}</li>
            }

            return (
              <li>
                <Link to={link}>{label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
