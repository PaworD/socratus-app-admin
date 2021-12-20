import { RouteConfig } from 'vue-router'

import { AddonView } from '@/views/addon/'

/**
 * Route to render addons
 */
export const addons: RouteConfig = {
  path: '/addons/:addonType',
  name: 'AddonView',
  component: AddonView,
  beforeEnter (to, from, next) {
    if (to.name === 'DashboardView') {
      next('/')
    } else {
      next()
    }
  }
}