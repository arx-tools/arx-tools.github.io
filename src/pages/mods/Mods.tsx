import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Mod, ModType } from '../../components/Mod/Mod'
import { SEO } from '../../components/SEO/SEO'

type ModsProps = {}

const modsByType: Record<
  ModType,
  Array<{
    link: string
    title: string
    description: string
    beforeAL13Support?: 'no' | 'partial' | 'full'
  }>
> = {
  'vanilla fix': [
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-golden-armor-fix',
      title: 'Golden armor fix',
      description: 'Makes the golden armor visible in the questbook',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-potion-guard',
      title: 'Potion guard',
      description: 'Prevents accidental waste of potions when player health or mana is full',
      beforeAL13Support: 'partial',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-outpost-ambience-fix',
      title: 'Outpost ambience fix',
      description:
        'Fixes the late game "feature" where the ambience no longer plays at the outpost after solving the troll quest',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-faster-buttons',
      title: 'Faster buttons',
      description: 'Reduces wait time between button presses',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-no-spiders',
      title: 'No Spiders',
      description: 'Removes spiders and spider webs from the game',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-unshittify',
      title: 'Unshittify',
      description: 'A few small changes to texts and audio to improve the clarity of the game',
    },
  ],
  challenge: [
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-rune-randomizer',
      title: 'Rune randomizer',
      description: 'Randomizes runes',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-empty-manabar-damage',
      title: 'Empty manabar damage',
      description: 'Makes the player take damage when his manapool completely drains',
      beforeAL13Support: 'no',
    },
  ],
  meme: [
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-giovanni-giorgio',
      title: 'Giovanni Giorgio',
      description:
        "Makes the fisherman in the city of Arx say the famous line from Daft Punk's song 'Giorgio by Moroder'",
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-snoring-menace',
      title: 'Snoring menace',
      description: 'Boosts all in-game snoring sounds to be more irritating',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-wednesday-my-dudes',
      title: 'It is Wednesday, my dudes',
      description: "Celebrates Wednesdays by making the frogs larger and say 'It is Wednesday, my dudes'",
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-buscemi-eyes',
      title: 'Buscemi eyes',
      description: 'Gives the super baggy eyes of Steve Buscemi to everything in-game that has eyes',
    },
  ],
  other: [
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-damage-displayer',
      title: 'Damage displayer',
      description: 'Shows the player the amount of damage he/she dealt to an enemy',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-item-respawn',
      title: 'Item respawner',
      description: 'Makes plants respawn in 2 minutes after picking them up or consuming them',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-pump-that-chicken',
      title: 'Pump that chicken!',
      description: "Makes the 'clicking on chickens' mechanism a bit more interesting",
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-restored-mouse-behavior',
      title: 'Restored mouse behavior',
      description: 'Restores the original funny behavior of mice that Arkane removed',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-everything-lockpickable',
      title: 'Everything lockpickable',
      description: 'Makes every door and lock pickable',
    },
    {
      link: 'https://github.com/meszaros-lajos-gyorgy/arx-mod-unlocked-sewer-hatches',
      title: 'Unlocked sewer hatches',
      description: 'Makes the sewer hatches in the castle openable',
    },
  ],
}

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

          <p>
            <small>
              <em>
                You can find more <b>mods</b> in the <a href="/pocs/#mods">proof of concepts</a> page
              </em>
            </small>
          </p>

          <ul className="mods" style={{ margin: '4em 0' }}>
            {Object.entries(modsByType).map(([type, mods], index) => {
              const modTags = mods.map(({ beforeAL13Support = 'full', ...props }) => {
                return <Mod type={type as ModType} beforeAL13Support={beforeAL13Support} {...props} />
              })

              return [modTags, ...(index > 0 ? [<br />] : [])]
            })}
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
