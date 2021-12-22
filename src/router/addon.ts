import { RouteConfig } from 'vue-router'

import { AddonView } from '@/views/addon/'

import store from '@/store'
import { AddonData } from '@/shared/models'
import { addonsRegistry } from '@/config'

/**
 * Route to render addons
 */
export const addons: RouteConfig = {
  path: '/addons/:addonType',
  name: 'AddonView',
  component: AddonView,
  meta: {
    auth: true
  },
  beforeEnter (to, from, next) {
    if (store.getters.myAddons.some((addon: AddonData) => addon.name === to.params.addonType) && (to.params.addonType in addonsRegistry)) {
      next()
    } else {
      return
    }
  }
}