import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'

type ToolsProps = {}

export const Tools: FC<ToolsProps> = () => {
  return (
    <>
      <h2>Tools</h2>
      <BackToHomepage />
    </>
  )
}
