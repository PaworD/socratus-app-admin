<template>
  <component :is="component" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { VueConstructor } from 'vue'

import { addonsRegistry } from '@/config'
import { Addons } from '@/addons'

import NotFoundAddon from '@/addons/not-found/NotFoundAddon.vue'

/**
 * View which is capable to render Addon
 */
@Component({
  name: 'AddonView'
})
export class AddonView extends Vue {

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