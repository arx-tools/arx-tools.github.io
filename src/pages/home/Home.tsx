import type { FC } from 'react'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'

type HomeProps = {}

export const Home: FC<HomeProps> = () => {
  return (
    <>
      <Header />
      <main>
        <div>
          <h2>Site under construction</h2>
        </div>
      </main>
      <Footer />
    </>
  )
}
