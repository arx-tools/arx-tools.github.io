import type { FC, ReactNode } from 'react'
import './InfoWithLink.css'

type InfoWithLinkProps = {
  children: ReactNode
}

export const InfoWithLink: FC<InfoWithLinkProps> = ({ children }) => {
  return <p className="InfoWithLink">{children}</p>
}
