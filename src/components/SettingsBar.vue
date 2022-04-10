<template>
  <div>
    <div class="overlay"></div>
    <div class="settings">

      <SIconButton @onClick="close" borderless>
        <template v-slot:icon>
          <i class="bi-x"></i>
        </template>
      </SIconButton>

      <SAccordion>
        <template v-slot:header>
          Rooms
        </template>
        <template v-slot:default>
          <Rooms/>
        </template>
      </SAccordion>
      <SAccordion>
        <template v-slot:header>
          Resources
        </template>
        <template v-slot:default>
          <Resources/>
        </template>
      </SAccordion>
      <SAccordion>
        <template v-slot:header>
          Settings
        </template>
        <template v-slot:default>
          <Settings/>
        </template>
      </SAccordion>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { SIconButton, SAccordion } from '@/shared/components'

import { Resources, Rooms, Settings } from '@/views/root'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({
  name: 'SettingsBar',
  components: {
    SAccordion,
    SIconButton,
    Rooms,
    Resources,
    Settings
  }
})
export class SettingsBar extends Vue{
  public close (): void {
    this.$emit('close')
  }

}
export default SettingsBar
</script>