import { FC } from 'react'
import { Link } from 'react-router'

type GalleryItemProps = {
  previewImageURL: string
  mapName: string
  directDownloadURL: string
  /**
   * version without "v" prefix, for example "2.1.4"
   */
  version: string
  homepageURL: string
}

export const GalleryItem: FC<GalleryItemProps> = ({
  previewImageURL,
  mapName,
  directDownloadURL: directDownloadLink,
  version,
  homepageURL,
}) => {
  return (
    <li>
      <img src={previewImageURL} alt={`Preview of '${mapName}' map`} />
      <span>{mapName}</span>
      <div className="hovericons">
        <Link to={directDownloadLink} title={`Download latest version (v${version})`}>
          <i className="fa-solid fa-download"></i>
        </Link>

        {homepageURL.startsWith('https://github.com') ? (
          <Link to={homepageURL} title="View project on github" target="_blank">
            <i className="fa-brands fa-github"></i>
          </Link>
        ) : (
          <Link to={homepageURL} title="Visit mod homepage" target="_blank">
            <i className="fa-solid fa-globe"></i>
          </Link>
        )}
      </div>
    </li>
  )
}
