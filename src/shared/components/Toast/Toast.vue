<template>
  <transition-group v-if="content.show" name="toasts" tag="div" class="toasts">
  <div :class="['toast', `toast__toast_theme__${content.theme}`]">
    {{content.message}}
  </div>
  </transition-group>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { Toast } from "./Toast.contracts";

@Component({name: 'SToast'})
export class SToast extends Vue {
  @Prop({type: Object, required: true})
  public readonly content!: Toast
}
export default SToast
</script>

<style lang="scss" scoped>

</style>