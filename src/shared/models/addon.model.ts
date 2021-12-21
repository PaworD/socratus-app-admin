import { Identifier } from './atom'

export interface AddonData extends Identifier{
  name: string
  isActive: boolean
  icon: string
}