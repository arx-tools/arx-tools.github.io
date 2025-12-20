import type { FC } from 'react'
import { Route, Routes } from 'react-router'
import { Docs } from './pages/docs/Docs'
import { Home } from './pages/home/Home'
import { Maps } from './pages/maps/Maps'
import { Mods } from './pages/mods/Mods'
import { POCs } from './pages/pocs/POCs'
import { Tools } from './pages/tools/Tools'
import './styles.css'

type AppProps = {}

export const App: FC<AppProps> = () => {
  return (
    <Routes>
      <Route path="/docs" Component={Docs} />
      <Route path="/" Component={Home} />
      <Route path="/maps" Component={Maps} />
      <Route path="/mods" Component={Mods} />
      <Route path="/pocs" Component={POCs} />
      <Route path="/tools" Component={Tools} />
    </Routes>
  )
}
