import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { GalleryItemComingSoon } from '../../components/GalleryItemComingSoon/GalleryItemComingSoon'
import { GithubGalleryItem } from '../../components/GithubGalleryItem/GithubGalleryItem'
import { Header } from '../../components/Header/Header'
import { InfoWithLink } from '../../components/InfoWithLink/InfoWithLink'
import { SEO } from '../../components/SEO/SEO'

type MapsProps = {}

export const Maps: FC<MapsProps> = () => {
  return (
    <>
      <SEO path="/maps" title="Custom Maps" description="Download custom maps for Arx Fatalis" />
      <Header
        breadcrumbs={[
          { link: '/', label: 'Home' },
          { link: '/maps', label: 'Maps' },
        ]}
      />
      <main>
        <div>
          <h2>Custom Maps for Arx Fatalis</h2>
          <BackToHomepage />
          <CompatibleWithModManager />

          {/* --------------------- */}

          <InfoWithLink>
            You can find more <b>maps</b> in the <a href="/pocs/#maps">proof of concepts</a> page
          </InfoWithLink>

          <div className="gallery">
            <ul style={{ margin: '4em 0' }}>
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-lalees-minigame"
                version="2.1.1"
                mapName="LaLee's minigame"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-ambience-gallery"
                version="1.0.1"
                mapName="Ambience gallery"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-basketball-course"
                version="1.0.0"
                mapName="Basketball course"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-item-gallery"
                version="1.0.0"
                mapName="Item gallery"
              />
              <GithubGalleryItem
                author="meszaros-lajos-gyorgy"
                project="arx-map-restored-outpost-and-tavern"
                version="1.1.1"
                mapName="Restored outpost and tavern"
              />

              {new Array(4).fill(1).map((_, index) => (
                <GalleryItemComingSoon key={index} />
              ))}
            </ul>
          </div>

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
