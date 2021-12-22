<template>
  <component :is="component" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueConstructor } from 'vue'
import { NavigationGuardNext, Route } from 'vue-router'
import { Getter } from 'vuex-class'

import { addonsRegistry } from '@/config'
import { Addons } from '@/addons'
import { AddonData } from '@/shared/models'

import NotFoundAddon from '@/addons/not-found/NotFoundAddon.vue'


/**
 * View which is capable to render Addon
 */
@Component<AddonView>({
  name: 'AddonView',

  /**
   * **IMPORTANT** guard which prevents accident access to not registered or not existing addons
   *
   * @param to
   * @param from
   * @param next
   *
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   */
  beforeRouteUpdate (to: Route, from: Route, next: NavigationGuardNext<Vue>): void {
    if (this.myAddons.some((addon: AddonData) => addon.name === to.params.addonType) &&
        (to.params.addonType in addonsRegistry)) {
      next()
    } else {
      return
    }
  }
})
export class AddonView extends Vue {

  /**
   * Getter to fetch store.getters.myAddon
   */
  @Getter
  public readonly myAddons!: AddonData[]

  /**
   * Typeof the addon that should be rendered
   */
  public get addonType (): Addons {
    return (this.$route.params.addonType) as Addons ?? 'blank'
  }

  /**
   * Finds addon's component
   */
  public get component (): VueConstructor {

    if (!this.addonType){
      throw new Error('Addon is required')
    }

    if (!(this.addonType in addonsRegistry)) {
      return NotFoundAddon
    }

    return addonsRegistry[this.addonType]
  }
}
export default AddonView
</script>