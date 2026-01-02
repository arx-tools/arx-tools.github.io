import _modsByType from './mods.json'

export type ModType = 'vanilla fix' | 'challenge' | 'meme' | 'other'

export type ModData = {
  link: string
  title: string
  description: string
  /**
   * whether the mod is supported in Arx Libertatis versions prior to 1.3
   *
   * @default "full"
   */
  beforeAL13Support?: 'no' | 'partial' | 'full'
  isPOC: boolean
}

export type ModsByType = Record<ModType, Array<ModData>>

export const modsByType = _modsByType as ModsByType
