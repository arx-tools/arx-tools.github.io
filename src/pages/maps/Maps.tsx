import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'

type MapsProps = {}

export const Maps: FC<MapsProps> = () => {
  return (
    <>
      <SEO path="/maps" title="Custom Maps" description="Download custom maps for Arx Fatalis" />
      <Header />
      <main>
        <div>
          <h2>Custom Maps for Arx Fatalis</h2>
          <BackToHomepage />
          <CompatibleWithModManager />

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
