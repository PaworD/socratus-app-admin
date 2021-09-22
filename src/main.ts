import 'reflect-metadata'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import _buildDependencyContainer from './app.container'
import { ServicesPlugin } from "@/plugins/services.plugin";

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

