import { Addon, AddonType } from '@/addons'

/**
 * TODO
 */
export const addonsRegistry = (): Record<AddonType, Addon> => {
  return {
    'Payments': 'PaymentAddon'
  }
}