import { Fragment, type CSSProperties, type FC } from 'react'
import { ModsByType, modsByType, type ModType } from '../../data/mods'
import { Mod } from '../Mod/Mod'

type ModListProps = {
  isPOC: boolean
  style?: CSSProperties
  hasGapBetweenTypes: boolean
}

export const ModList: FC<ModListProps> = ({ isPOC, style, hasGapBetweenTypes }) => {
  const filteredModsByType = Object.fromEntries(
    Object.entries(modsByType)
      .map(([type, mods]) => {
        mods = mods.filter((mod) => {
          return mod.isPOC === isPOC
        })
        return [type, mods]
      })
      .filter(([, mods]) => {
        return mods.length > 0
      }),
  ) as ModsByType

  return (
    <ul className="mods" style={style}>
      {Object.entries(filteredModsByType).map(([type, mods], index) => {
        const modTags = mods.map(({ beforeAL13Support = 'full', ...modProps }, innerIndex) => {
          return (
            <Mod
              type={type as ModType}
              beforeAL13Support={beforeAL13Support}
              {...modProps}
              key={`${index}--${innerIndex}`}
            />
          )
        })

        // TODO: this could probably be better done with CSS
        if (hasGapBetweenTypes === true && index > 0) {
          return (
            <Fragment key={index}>
              <br />
              <br />
              {modTags}
            </Fragment>
          )
        }

        return <Fragment key={index}>{modTags}</Fragment>
      })}
    </ul>
  )
}
