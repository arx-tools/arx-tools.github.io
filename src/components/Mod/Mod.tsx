import type { FC } from 'react'
import { Link } from 'react-router'
import './Mod.css'

export type ModType = 'vanilla fix' | 'challenge' | 'meme' | 'other'

type ModProps = {
  type: ModType
  link: string
  title: string
  description: string
  /**
   * whether the mod is supported in Arx Libertatis versions prior to 1.3
   *
   * @default "full"
   */
  beforeAL13Support?: 'no' | 'partial' | 'full'
}

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
