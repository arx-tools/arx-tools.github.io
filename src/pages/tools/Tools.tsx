import type { FC } from 'react'
import { BackToHomepage } from '../../components/BackToHomepage/BackToHomepage'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { SEO } from '../../components/SEO/SEO'

type ToolsProps = {}

export const Tools: FC<ToolsProps> = () => {
  return (
    <>
      <SEO
        path="/tools"
        title="Tools"
        description="A list of command-line and gui tools for making maps and modding Arx Fatalis"
      />
      <Header />
      <main>
        <div>
          <h2>Tools</h2>
          <BackToHomepage />
        </div>
      </main>
      <Footer />
    </>
  )
}
