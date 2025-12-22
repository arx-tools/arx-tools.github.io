import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
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

          {/* ------------------------------ */}

          <p>
            <small>
              <em>
                You can find more <b>mods</b> in the <a href="/pocs/#mods">proof of concepts</a> page
              </em>
            </small>
          </p>

          <ul className="mods" style={{ margin: '4em 0' }}>
            <li data-type="vanilla fix">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-golden-armor-fix" target="_blank">
                Golden armor fix
              </a>
              <span>Makes the golden armor visible in the questbook</span>
            </li>
            <li data-type="vanilla fix" data-before-al13-support="partial">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-potion-guard" target="_blank">
                Potion guard
              </a>
              <span>Prevents accidental waste of potions when player health or mana is full</span>
            </li>
            <li data-type="vanilla fix">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-outpost-ambience-fix" target="_blank">
                Outpost ambience fix
              </a>
              <span>
                Fixes the late game "feature" where the ambience no longer plays at the outpost after solving the troll
                quest
              </span>
            </li>
            <li data-type="vanilla fix">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-faster-buttons" target="_blank">
                Faster buttons
              </a>
              <span>Reduces wait time between button presses</span>
            </li>
            <li data-type="vanilla fix">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-no-spiders" target="_blank">
                No Spiders
              </a>
              <span>Removes spiders and spider webs from the game</span>
            </li>
            <li data-type="vanilla fix">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-unshittify" target="_blank">
                Unshittify
              </a>
              <span>A few small changes to texts and audio to improve the clarity of the game</span>
            </li>

            <br />

            <li data-type="challenge">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-rune-randomizer" target="_blank">
                Rune randomizer
              </a>
              <span>Randomizes runes</span>
            </li>

            <li data-type="challenge" data-before-al13-support="no">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-empty-manabar-damage" target="_blank">
                Empty manabar damage
              </a>
              <span>Makes the player take damage when his manapool completely drains</span>
            </li>

            <br />

            <li data-type="meme">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-giovanni-giorgio" target="_blank">
                Giovanni Giorgio
              </a>
              <span>
                Makes the fisherman in the city of Arx say the famous line from Daft Punk's song 'Giorgio by Moroder'
              </span>
            </li>
            <li data-type="meme">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-snoring-menace" target="_blank">
                Snoring menace
              </a>
              <span>Boosts all in-game snoring sounds to be more irritating</span>
            </li>
            <li data-type="meme">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-wednesday-my-dudes" target="_blank">
                It is Wednesday, my dudes
              </a>
              <span>Celebrates Wednesdays by making the frogs larger and say 'It is Wednesday, my dudes'</span>
            </li>
            <li data-type="meme">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-buscemi-eyes" target="_blank">
                Buscemi eyes{' '}
              </a>
              <span>Gives the super baggy eyes of Steve Buscemi to everything in-game that has eyes</span>
            </li>

            <br />

            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-damage-displayer" target="_blank">
                Damage displayer
              </a>
              <span>Shows the player the amount of damage he/she dealt to an enemy</span>
            </li>
            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-item-respawn" target="_blank">
                Item respawner
              </a>
              <span>Makes plants respawn in 2 minutes after picking them up or consuming them</span>
            </li>
            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-pump-that-chicken" target="_blank">
                Pump that chicken!
              </a>
              <span>Makes the "clicking on chickens" mechanism a bit more interesting</span>
            </li>
            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-restored-mouse-behavior" target="_blank">
                Restored mouse behavior
              </a>
              <span>Restores the original funny behavior of mice that Arkane removed</span>
            </li>
            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-everything-lockpickable" target="_blank">
                Everything lockpickable
              </a>
              <span>Makes every door and lock pickable</span>
            </li>
            <li data-type="other">
              <a href="https://github.com/meszaros-lajos-gyorgy/arx-mod-unlocked-sewer-hatches" target="_blank">
                Unlocked sewer hatches
              </a>
              <span>Makes the sewer hatches in the castle openable</span>
            </li>
          </ul>

          <CompatibleWithModManager />

          <p>
            <small>
              <em>
                You can find more <b>mods</b> in the <a href="/pocs/#mods">proof of concepts</a> page
              </em>
            </small>
          </p>

          <br />

          {/* ------------------------------ */}
        </div>
      </main>
      <Footer />
    </>
  )
}
