<template>
  <transition appear name="slide-fade" mode="out-in">
    <div v-if="content.show" :class="['toast', `toast__toast_theme__${content.theme}`]">
      <i :class="content.theme === 'error' ? 'bi-patch-exclamation' : 'bi-patch-check'"></i>
      <span v-html="content.message"></span>
    </div>
  </transition>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { Toast } from "./Toast.contracts";

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.code>
 */
@Component({
  name: 'SToast'
})
export class SToast extends Vue {
  @Prop({type: Object, required: true})
  public readonly content!: Toast
}
export default SToast
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>