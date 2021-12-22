import { Identifier } from './atom'

/**
 * Model of `Addon`
 */
export interface AddonData extends Identifier {
  displayName: string
  isActive: boolean
  iconName: string
  name: string
}