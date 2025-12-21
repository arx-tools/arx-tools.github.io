import { FC } from 'react'
import { Link } from 'react-router-dom'
import './CompatibleWithModManager.css'

type CompatibleWithModManagerProps = {}

export const CompatibleWithModManager: FC<CompatibleWithModManagerProps> = () => {
  return (
    <p className="CompatibleWithModManager">
      All maps and mods listed on this page are compatible with
      <Link to="https://github.com/fredlllll/Arx Libertatis Mod Manager" target="_blank">
        Arx Libertatis Mod Manager
      </Link>
    </p>
  )
}
