import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'

type ModsProps = {}

export const Mods: FC<ModsProps> = () => {
  return (
    <>
      <SEO path="/mods" title="Mods" description="Find mods for Arx Fatalis" />
      <Header />
      <main>
        <div>
          <h2>Mods</h2>
          <BackToHomepage />
        </div>
      </main>
      <Footer />
    </>
  )
}
