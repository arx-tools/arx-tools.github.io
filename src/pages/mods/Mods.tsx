import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'

type ModsProps = {}

export const Mods: FC<ModsProps> = () => {
  return (
    <>
      <h2>Mods</h2>
      <BackToHomepage />
    </>
  )
}
