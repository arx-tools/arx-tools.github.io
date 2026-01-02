import type { FC } from 'react'
import { Link } from 'react-router'
import type { ModData, ModType } from '../../data/mods'
import './Mod.css'

type ModProps = { type: ModType } & Omit<ModData, 'isPOC'>

export const Mod: FC<ModProps> = ({ type, link, title, description, beforeAL13Support = 'full' }) => {
  return (
    <li data-type={type} data-before-al13-support={beforeAL13Support}>
      {' '}
      <Link to={link} target="_blank">
        {title}
      </Link>{' '}
      <span>{description}</span>
    </li>
  )
}
