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

          {/* -------------------------------- */}

          <h3 id="maps">Maps</h3>

          <div className="gallery">
            <ul>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-katamari-damacy/refs/heads/master/preview.jpg"
                  alt="Preview of 'Katamari Damacy' map"
                />
                <span>Katamari Damacy</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-katamari-damacy/releases/download/v1.4.0/arx-map-katamari-damacy-v1.4.0.zip"
                    title="Download latest version (v1.4.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-katamari-damacy"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-alias-nightmare/master/preview.jpg"
                  alt="Preview of 'Alia's nightmare' map"
                />
                <span>Alia's nightmare</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-alias-nightmare/releases/download/v1.1.0/arx-map-alias-nightmare-v1.1.0.zip"
                    title="Download latest version (v1.1.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-alias-nightmare"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-disco/master/preview.jpg"
                  alt="Preview of 'Disco' map"
                />
                <span>Disco</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-disco/releases/download/v1.0.0/arx-map-disco-v1.0.0.zip"
                    title="Download latest version (v1.0.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-disco"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-poc-surface-city/master/preview.jpg"
                  alt="Preview of 'Surface city' map"
                />
                <span>Surface city</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-poc-surface-city/releases/download/v1.0.0/arx-poc-surface-city-v1.0.0.zip"
                    title="Download latest version (v1.0.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-poc-surface-city"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-gungame-arena/master/preview.jpg"
                  alt="Preview of 'Gungame arena' map"
                />
                <span>Gungame Arena</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-gungame-arena/releases/download/v0.0.1/arx-map-gungame-arena-v0.0.1.zip"
                    title="Download latest version (v0.0.1)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-gungame-arena"
                    title="View source code on github"
                    target="_blank"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="https://raw.githubusercontent.com/meszaros-lajos-gyorgy/arx-map-enhanced-goblin-mines/master/preview.jpg"
                  alt="Preview of 'Enhanced goblin mines' map"
                />
                <span>Enhanced goblin mines</span>
                <div className="hovericons">
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-enhanced-goblin-mines/releases/download/v1.0.0/arx-map-enhanced-goblin-mines-v.1.0.0.zip"
                    title="Download latest version (v1.0.0)"
                  >
                    <i className="fa-solid fa-download"></i>
                  </a>
                  <a
                    href="https://github.com/meszaros-lajos-gyorgy/arx-map-enhanced-goblin-mines"
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
            </ul>
          </div>

          <h3 id="mods">Mods</h3>

          <ul className="mods">
            <li data-type="meme">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-fart-magic-sounds" target="_blank">
                Fart magic sounds
              </a>
              <span>Replaces all magic related sound effects with fart sounds</span>
            </li>

            <br />

            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-poc-guns" target="_blank">
                Guns
              </a>
              <span>A proof of concept mod/map for adding guns</span>
            </li>
          </ul>

          <br />
          <br />

          {/* -------------------------------- */}

          <CompatibleWithModManager />
        </div>
      </main>
      <Footer />
    </>
  )
}
