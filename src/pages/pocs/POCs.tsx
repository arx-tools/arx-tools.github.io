import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { CompatibleWithModManager } from '../../components/CompatibleWithModManager/CompatibleWithModManager'

type POCsProps = {}

export const POCs: FC<POCsProps> = () => {
  return (
    <>
      <h2>Proof of concept / Work in progress content</h2>
      <BackToHomepage />
      <CompatibleWithModManager />

      <CompatibleWithModManager />
    </>
  )
}
