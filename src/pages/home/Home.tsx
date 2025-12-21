import type { FC } from 'react'
import { Link } from 'react-router'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'

type HomeProps = {}

export const Home: FC<HomeProps> = () => {
  return (
    <>
      <h2>Arx Fatalis goodies by categories</h2>
      <CompatibleWithModManager />

      <ul style={{ margin: '4em 0' }}>
        <li>
          <Link to="/maps/">Maps</Link>
          <span>A list of custom maps available for Arx Fatalis</span>
        </li>
        <li>
          <Link to="/mods/">Mods</Link>
          <span>A list of modifications available for Arx Fatalis</span>
        </li>
        <li>
          <Link to="/pocs/">Proof of concepts</Link>
          <span>A random list of proof of concept / work in progress content for Arx Fatalis</span>
        </li>
        <li>
          <Link to="/tools/">Tools</Link>
          <span>A list of tools for map making and modding Arx Fatalis</span>
        </li>
        <li>
          <Link to="/docs/">Docs</Link>
          <span>A list of Arx Fatalis related documents that are worth reading</span>
        </li>
      </ul>

      <CompatibleWithModManager />
    </>
  )
}
