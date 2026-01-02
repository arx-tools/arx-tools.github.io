import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { InfoWithLink } from '../../components/InfoWithLink/InfoWithLink'
import { ModList } from '../../components/ModList/ModList'
import { SEO } from '../../components/SEO/SEO'

type ModsProps = {}

export const Mods: FC<ModsProps> = () => {
  return (
    <>
      <SEO path="/mods" title="Mods" description="Find mods for Arx Fatalis" />
      <Header
        breadcrumbs={[
          { link: '/', label: 'Home' },
          { link: '/mods', label: 'Mods' },
        ]}
      />
      <main>
        <div>
          <h2>Mods</h2>
          <BackToHomepage />

          <CompatibleWithModManager />
          <InfoWithLink>
            You can find more <b>mods</b> in the <a href="/pocs/#mods">proof of concepts</a> page
          </InfoWithLink>

          <ModList isPOC={false} style={{ margin: '4em 0' }} hasGapBetweenTypes={true} />

          <CompatibleWithModManager />
          <InfoWithLink>
            You can find more <b>mods</b> in the <a href="/pocs/#mods">proof of concepts</a> page
          </InfoWithLink>
        </div>
      </main>
      <Footer />
    </>
  )
}
