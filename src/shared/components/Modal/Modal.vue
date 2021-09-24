<template>
  <transition name="modal-fade" appear>
  <div class="modal" v-if="show" @keydown.esc="closeOnEsc">
    <div :class="['modal__wrapper', `modal__wrapper__${this.setting.size}`]">
      <div v-if="canHaveHeader" :class="[`modal__wrapper__header`]">
        <span class="modal__header__close" @click="close"></span>
      </div>
      <slot></slot>
    </div>
  </div>
  </transition>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { ModalConfigs, ModalSizeConfig, sizeMap} from "@/shared/abstract";

@Component({name: 'SModalWrapper'})
export class SModalWrapper extends Vue {
  @Prop({type: Object, required: true})
  public readonly setting!: ModalConfigs

  @Prop({type: Boolean, required: false})
  public show!: boolean

  public get size (): ModalSizeConfig {
    return sizeMap[this.setting.size]
  }

  public get canHaveHeader (): boolean {
    return this.setting.hasHeader
  }

  public close(): void {
    this.$emit('on-close')
  }

  public closeOnEsc(): void {
    this.$emit('on-close')
  }
}
export default SModalWrapper
</script>

<style lang="scss" scoped>

</style>