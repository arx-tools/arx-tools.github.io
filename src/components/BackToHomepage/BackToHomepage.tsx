import { FC } from 'react'
import { Link } from 'react-router'

type BackToHomepageProps = {}

export const BackToHomepage: FC<BackToHomepageProps> = () => {
  return (
    <p>
      <Link to="/">&laquo; back to homepage</Link>
    </p>
  )
}
