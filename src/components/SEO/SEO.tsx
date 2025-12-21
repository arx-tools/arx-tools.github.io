import { FC } from 'react'

type SEOProps = {
  /**
   * starts with `/`, for example `/` for home, `/docs` for docs
   */
  path: string

  title?: string
  description?: string
}

export const SEO: FC<SEOProps> = ({ title, description, path }) => {
  const brandTitle = 'Arx Fatalis Maps, Mods and Modding Tools'

  return (
    <head>
      <title>{title ? `${title} - ${brandTitle}` : brandTitle}</title>
      <meta name="description" content={description ?? brandTitle} />

      <meta property="og:title" content={title ? `${title} - ${brandTitle}` : brandTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://arx-tools.github.io${path}`} />
      <meta property="og:description" content={description ?? brandTitle} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={brandTitle} />
    </head>
  )
}
