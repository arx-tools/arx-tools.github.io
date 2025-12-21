import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'

type POCsProps = {}

export const POCs: FC<POCsProps> = () => {
  return (
    <>
      <SEO
        path="/pocs"
        title="Proof of Concept / Work in progress content"
        description="Check out proof of concept and work in progress maps and mods for Arx Fatalis"
      />
      <Header />
      <main>
        <div>
          <h2>Proof of concept / Work in progress content</h2>
          <BackToHomepage />
          <CompatibleWithModManager />

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
