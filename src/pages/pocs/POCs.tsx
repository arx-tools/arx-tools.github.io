import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { GalleryItemComingSoon } from '../../components/GalleryItemComingSoon/GalleryItemComingSoon'
import { GithubGalleryItem } from '../../components/GithubGalleryItem/GithubGalleryItem'
import { Header } from '../../components/Header/Header'
import { Mod } from '../../components/Mod/Mod'
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
      <Header
        breadcrumbs={[
          { link: '/', label: 'Home' },
          { link: '/pocs', label: 'Proof of concepts' },
        ]}
      />
      <main>
        <div>
          <h2>Proof of concept / Work in progress content</h2>
          <BackToHomepage />
          <CompatibleWithModManager />

          <h3 id="maps">Maps</h3>

          <div className="gallery">
            <ul>
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-katamari-damacy"
                version="1.4.0"
                mapName="Katamari Damacy"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-alias-nightmare"
                version="1.1.0"
                mapName="Alia's nightmare"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-disco"
                version="1.0.0"
                mapName="Disco"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-poc-surface-city"
                version="1.0.0"
                mapName="Surface city"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-gungame-arena"
                version="0.0.1"
                mapName="Gungame arena"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-enhanced-goblin-mines"
                version="1.0.0"
                mapName="Enhanced goblin mines"
              />

              {new Array(3).fill(1).map((_, index) => (
                <GalleryItemComingSoon key={index} />
              ))}
            </ul>
          </div>

          <h3 id="mods">Mods</h3>

          <ul className="mods">
            <Mod
              type="meme"
              link="https://github.com/meszaros-lajos-gyorgy/arx-mod-fart-magic-sounds"
              title="Fart magic sounds"
              description="Replaces all magic related sound effects with fart sounds"
            />

            <br />

            <Mod
              type="other"
              link="https://github.com/meszaros-lajos-gyorgy/arx-poc-guns"
              title="Guns"
              description="A proof of concept mod/map for adding guns"
            />
          </ul>

          <br />

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
