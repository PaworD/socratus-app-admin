<template>
  <div>
    <div class="overlay"></div>
    <div class="settings">
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({
  name: 'SettingsBar'
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