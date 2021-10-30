<template>
  <button class="icon-button" :class="{'--borderless': borderless}" @click="onClick">
    <slot name="icon"></slot>
  </button>
</template>


<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component<SIconButton>({name: 'SIconButton'})
export class SIconButton extends Vue {
  @Prop({type: Boolean, required: false, default: false})
  public readonly borderless!: boolean

  public onClick (): void {
    this.$emit('onClick')
  }

}
export default SIconButton
</script>

<style lang="scss" scoped>
.icon-button {

  border: none;
  outline: none;

  background: transparent;

  padding: .4rem .6rem;

  border-radius: 5px;

  box-shadow: 0px 0px 1px .4px #acabab;

  will-change: background;

  cursor: pointer;

  &.--borderless {
    box-shadow: none;
  }

  &:hover {
    background: #f1f1f1;
  }
}
</style>