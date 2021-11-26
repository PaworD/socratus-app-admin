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
          General Settings
        </template>
        <template v-slot:default>
          Hello
        </template>
      </SAccordion>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator"
import { Rooms } from '@/views/root/Rooms.vue'
import { SIconButton, SAccordion } from '@/shared/components'

@Component({
  name: 'SettingsBar',
  components: {
    SAccordion,
    SIconButton,
    Rooms
  }
})
export class SettingsBar extends Vue{

  public close (): void {
    this.$emit('close')
  }

}
export default SettingsBar
</script>

<style lang="scss" scoped>

</style>