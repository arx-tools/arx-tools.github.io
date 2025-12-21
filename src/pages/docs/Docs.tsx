import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'

type DocsProps = {}

export const Docs: FC<DocsProps> = () => {
  return (
    <>
      <h2>Docs</h2>

      <BackToHomepage />

      <ul>
        <li>
          <a href="https://github.com/arx-tools/asl-cookbook" target="_blank">
            <abbr title="Arx Scrtipting Language">ASL</abbr> cookbook
          </a>
          <span>Practical examples on how to do certain things with the Arx Scripting Language (ASL)</span>
        </li>
      </ul>
    </>
  )
}
