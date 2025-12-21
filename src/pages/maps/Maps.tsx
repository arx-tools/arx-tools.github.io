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

          <p>
            <small>
              <em>
                You can find more <b>maps</b> in the
                <a href="/pocs/#maps">proof of concepts</a>
                page
              </em>
            </small>
          </p>

          <div className="gallery">
            <ul>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-lalees-minigame/master/preview.jpg"
                  alt="Preview of 'LaLee's minigame' map"
                />
                <span>LaLee's minigame</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-lalees-minigame/releases/download/v2.1.1/arx-map-lalees-minigame-v2.1.1.zip"
                    title="Download latest version (v2.1.1)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-lalees-minigame"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>

              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-ambience-gallery/master/preview.jpg"
                  alt="Preview of 'Ambience gallery' map"
                />
                <span>Ambience gallery</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-ambience-gallery/releases/download/v1.0.1/arx-map-ambience-gallery-v1.0.1.zip"
                    title="Download latest version (v1.0.1)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-ambience-gallery"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>

              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-basketball-course/master/preview.jpg"
                  alt="Preview of 'Basketball course' map"
                />
                <span>Basketball course</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-basketball-course/releases/download/v1.0.0/arx-map-basaketball-course-v1.0.0.zip"
                    title="Download latest version (v1.0.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-basketball-course"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>

              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-item-gallery/master/preview.jpg"
                  alt="Preview of 'Item gallery' map"
                />
                <span>Item gallery</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-item-gallery/releases/download/v1.0.0/arx-map-item-gallery-v1.0.0.zip"
                    title="Download latest version (v1.0.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-item-gallery"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>

              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-restored-outpost-and-tavern/master/preview.jpg"
                  alt="Preview of 'Restored outpost and tavern' map"
                />
                <span>Restored outpost and tavern</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-restored-outpost-and-tavern/releases/download/v1.1.1/arx-map-restored-outpost-and-tavern-v1.1.1.zip"
                    title="Download latest version (v1.1.1)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-restored-outpost-and-tavern"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>

              <li>
                <img src="/image-not-available.webp" alt="Map not yet available" />
                <span>Coming soon</span>
              </li>
              <li>
                <img src="/image-not-available.webp" alt="Map not yet available" />
                <span>Coming soon</span>
              </li>
              <li>
                <img src="/image-not-available.webp" alt="Map not yet available" />
                <span>Coming soon</span>
              </li>
              <li>
                <img src="/image-not-available.webp" alt="Map not yet available" />
                <span>Coming soon</span>
              </li>
            </ul>
          </div>

          <br />
          <br />

          {/* --------------------- */}

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
