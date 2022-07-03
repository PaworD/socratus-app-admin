import 'reflect-metadata'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

import { ServicesPlugin } from '@/plugins/services.plugin'

import App from './App.vue'
import router from './router'
import store from './store'

import _buildDependencyContainer from './app.container'

// Import Directives
import './shared/directives/ripple'

class AppBootstrap {

  constructor () {
    this.applyPlugins()
    this.loadDependencyContainer()
    this.loadVueApp()
  }

  private applyPlugins(): void {
    Vue.use(ServicesPlugin)
    Vue.use(VueLazyload, {
      attempt: 2,
      preLoad: 1.3
    })
  }

  private loadDependencyContainer (): void {
    _buildDependencyContainer()
  }

  private loadVueApp (): void {
    Vue.config.productionTip = false

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
}

new AppBootstrap()

