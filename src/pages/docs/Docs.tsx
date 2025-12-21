import type { FC } from 'react'
import { Link } from 'react-router'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'

type DocsProps = {}

export const Docs: FC<DocsProps> = () => {
  return (
    <>
      <SEO
        path="/docs"
        title="Custom Maps"
        description="A list of Arx Fatalis related documents that are worth checking out either if you are a modder or you want to hack the game"
      />
      <Header
        breadcrumbs={[
          { link: '/', label: 'Home' },
          { link: '/docs', label: 'Docs' },
        ]}
      />
      <main>
        <div>
          <h2>Docs</h2>
          <BackToHomepage />
          <ul>
            <li>
              <Link to="https://github.com/arx-tools/asl-cookbook" target="_blank">
                <abbr title="Arx Scrtipting Language">ASL</abbr> cookbook
              </Link>
              <span>Practical examples on how to do certain things with the Arx Scripting Language (ASL)</span>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
