import { z } from 'zod'
import _maps from './maps.json'
import _mods from './mods.json'
import _tools from './tools.json'

// The content of the site is data, not code: adding a map, a mod or a tool is a JSON edit.
// Every file is validated here at build time, so a typo (a missing field, a mistyped
// category, a link which is not a URL) fails the build instead of silently dropping an
// item from a page.

export const modTypeSchema = z.enum(['vanilla fix', 'challenge', 'meme', 'other'])
export type ModType = z.infer<typeof modTypeSchema>

export const modSchema = z.object({
  link: z.url(),
  title: z.string().min(1),
  description: z.string().min(1),
  /**
   * whether the mod is supported in Arx Libertatis versions prior to 1.3, defaults to "full"
   */
  beforeAL13Support: z.enum(['no', 'partial', 'full']).optional(),
  isPOC: z.boolean(),
})
export type ModData = z.infer<typeof modSchema>

export const modsByTypeSchema = z.record(modTypeSchema, z.array(modSchema))
export type ModsByType = z.infer<typeof modsByTypeSchema>

export const mapSchema = z.object({
  /**
   * the GitHub user or organization which owns the map repository
   */
  author: z.string().min(1),

  /**
   * the name of the map repository, the release zip and the preview image are derived from it
   */
  project: z.string().min(1),

  /**
   * the released version without the "v" prefix, for example "2.1.4"
   */
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'the version has to be a released version like "2.1.4"'),

  mapName: z.string().min(1),
  isPOC: z.boolean(),
})
export type MapData = z.infer<typeof mapSchema>

export const toolSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  description: z.string().min(1),
})
export type ToolData = z.infer<typeof toolSchema>

export const modsByType = modsByTypeSchema.parse(_mods)
export const maps = z.array(mapSchema).parse(_maps)
export const tools = z.array(toolSchema).parse(_tools)
