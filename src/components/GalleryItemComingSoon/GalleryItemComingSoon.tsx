import { FC } from 'react'

type GalleryItemComingSoonProps = {}

export const GalleryItemComingSoon: FC<GalleryItemComingSoonProps> = () => {
  return (
    <li>
      <img src="/image-not-available.webp" alt="Map not yet available" />
      <span>Coming soon</span>
    </li>
  )
}
