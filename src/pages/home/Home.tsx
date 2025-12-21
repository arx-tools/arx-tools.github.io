import type { FC } from 'react'
import { Link } from 'react-router'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'
import './Home.css'

type HomeProps = {}

export const Home: FC<HomeProps> = () => {
  return (
    <>
      <SEO path="/" />
      <Header breadcrumbs={[{ link: '/', label: 'Home' }]} />
      <main>
        <div>
          <h2>Arx Fatalis goodies</h2>
          <CompatibleWithModManager />

          <ul className="toc">
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
        </div>
      </main>
      <Footer />
    </>
  )
}
