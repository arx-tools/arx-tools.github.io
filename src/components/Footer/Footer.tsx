import { FC } from 'react'
import './Footer.css'

type FooterProps = {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer>
      This website or the content on it is NOT in any ways connected to Arkane Studios, Bethesda or Microsoft. All is
      made with love by dedicated fans who try to keep the game alive. No AI have been used to create any of the content
      presented on this site, everything is hand crafted by real human beings. &nbsp;
      <a href="https://github.com/arx-tools/arx-tools.github.io" target="_blank">
        website&nbsp;source
      </a>
    </footer>
  )
}
