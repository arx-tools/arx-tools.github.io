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
      <Header
        breadcrumbs={[
          { link: '/', label: 'Home' },
          { link: '/tools', label: 'Tools' },
        ]}
      />
      <main>
        <div>
          <h2>Tools</h2>
          <BackToHomepage />

          {/* ------------------- */}

          <ul>
            <li>
              <a href="https://github.com/fredlllll/Arx Libertatis Mod Manager" target="_blank">
                Arx Libertatis Mod Manager
              </a>
              <span>
                A graphical application for managing Arx Fatalis mods (requires
                <a href="https://arx-libertatis.org/" target="_blank">
                  Arx Libertatis
                </a>
                )
              </span>
            </li>
            <li>
              <a href="https://github.com/arx-tools/arx-level-generator" target="_blank">
                arx-level-generator
              </a>
              <span>A suite of node.js tools for creating Arx Fatalis maps from code</span>
            </li>
            <li>
              <a href="https://github.com/fredlllll/arx-mesh-editor" target="_blank">
                arx-mesh-editor
              </a>
              <span>A Unity3D program for editing the polygons of existing Arx Fatalis levels</span>
            </li>
            <li>
              <a href="https://github.com/arx-tools/arx-convert" target="_blank">
                arx-convert
              </a>
              <span>A command line tool for converting various custom Arx Fatalis formats to JSON/YAML and back</span>
            </li>
            <li>
              <a href="https://github.com/fredlllll/ArxLibertatisEditorIO" target="_blank">
                ArxLibertatisEditorIO
              </a>
              <span>A C# library to read and write various Arx Fatalis file formats</span>
            </li>
            <li>
              <a href="https://github.com/fredlllll/ArxLibertatisLightingCalculator" target="_blank">
                ArxLibertatisLightingCalculator
              </a>
              <span>
                A program to recalculate lighting data for Arx Fatalis/Libertatis levels using different algorithms
              </span>
            </li>
            <li>
              <a href="https://github.com/arx-tools/node-pkware" target="_blank">
                node-pkware
              </a>
              <span>nodejs implementation of StormLib's pkware compression/decompression algorithm</span>
            </li>
            <li>
              <a href="https://github.com/arx-tools/arx-header-size" target="_blank">
                arx-header-size
              </a>
              <span>
                A command line tool for determining the size of the uncompressed portion of various semi-compressed
                custom file formats used by Arx Fatalis
              </span>
            </li>

            <li>
              <a href="https://wiki.arx-libertatis.org/Arx_Fatalis_tools" target="_blank">
                list of tools on Arx Libertatis wiki
              </a>
              <span>A list containing other tools which are not present in this list, like DANAE or ArxPak</span>
            </li>
          </ul>

          {/* ------------------- */}
        </div>
      </main>
      <Footer />
    </>
  )
}
