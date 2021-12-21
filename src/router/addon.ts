import { RouteConfig } from 'vue-router'

import { AddonView } from '@/views/addon/'

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
  // TODO
  beforeEnter (to, from, next) {
    next()
  }
}