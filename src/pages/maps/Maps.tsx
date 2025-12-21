import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'

type MapsProps = {}

export const Maps: FC<MapsProps> = () => {
  return (
    <>
      <h2>Custom Maps for Arx Fatalis</h2>
      <BackToHomepage />
      <CompatibleWithModManager />

      <CompatibleWithModManager />
    </>
  )
}
