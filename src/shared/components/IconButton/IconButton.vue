<template>
  <button class="icon-button" :class="[ `--${theme}`,{'--borderless': borderless}]"
          @click="onClick">
    <slot v-if="$slots.icon" name="icon"></slot>
    <slot></slot>
  </button>
</template>


<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator"
import { ButtonTheme } from '@/shared/components'

@Component<SIconButton>({name: 'SIconButton'})
export class SIconButton extends Vue {
  @Prop({type: Boolean, required: false, default: false})
  public readonly borderless!: boolean

  @Prop({ type: String, required: false, default: ButtonTheme.TRANSPARENT })
  public readonly theme!: ButtonTheme

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

  padding: .4rem .6rem;

  border-radius: 5px;

  box-shadow: 0px 0px 1px .4px #acabab;

  will-change: background;

  cursor: pointer;

  &.--transparent {
    background-color: transparent;

    &:hover {
      background: #f1f1f1;
    }
  }

  &.--secondary {
    background-color: $secondary;
    color: $white;

    &:hover {
      opacity: .8;
    }
  }

  &.--danger {
    background-color: $danger;
    color: $white;

    &:focus {
      box-shadow: 0px 0px 1px 2px rgba(220, 53, 69, 0.51);
    }
  }

  &.--borderless {
    box-shadow: none;
  }
}
</style>