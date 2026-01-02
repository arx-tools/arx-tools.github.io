import { FC } from 'react'
import { Link } from 'react-router-dom'
import { InfoWithLink } from '../InfoWithLink/InfoWithLink'

type CompatibleWithModManagerProps = {}

export const CompatibleWithModManager: FC<CompatibleWithModManagerProps> = () => {
  return (
    <InfoWithLink>
      All maps and mods listed on this page are compatible with{' '}
      <Link to="https://github.com/fredlllll/ArxLibertatisModManager" target="_blank">
        Arx Libertatis Mod Manager
      </Link>
    </InfoWithLink>
  )
}
