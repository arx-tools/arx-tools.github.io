import { FC } from 'react'
import { GalleryItem } from '../GalleryItem/GallerItem'

type GithubGalleryItemProps = {
  author: string
  project: string
  version: string
  mapName: string
}

export const GithubGalleryItem: FC<GithubGalleryItemProps> = ({ author, project, version, mapName }) => {
  return (
    <GalleryItem
      previewImageURL={`https://raw.githubusercontent.com/${author}/${project}/refs/heads/master/preview.jpg`}
      mapName={mapName}
      directDownloadURL={`https://github.com/${author}/${project}/releases/download/v${version}/${project}-v${version}.zip`}
      version={version}
      homepageURL={`https://github.com/${author}/${project}`}
    />
  )
}
