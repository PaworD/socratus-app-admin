<template>
  <button
  @click="onClick"
  :data-tooltip="tooltip"
  :class="[ 'button ', `button--${theme}`, `button--${size}`, { 'button--flat' : flat }]"
  >
    <div v-if="!$slots.icon">{{label}}</div>
    <div v-if="$slots.icon"><slot name="icon"></slot></div>
  </button>
</template>

<script lang="ts">
// Socratus Core 2021

import { Vue, Component, Prop } from "vue-property-decorator";

import { ButtonSize, ButtonTheme } from './Button.contracts'

/**
 * @author Javlon Khalimjonov <khalimajonov.code@gmail.com>
 */
@Component({ name: 'SButton' })
export class SButton extends Vue {
  @Prop({type: String, required: true, default: ''})
  private readonly label!: string

  @Prop({type: String, required: false, default: ''})
  private readonly tooltip!: string

  @Prop({type: Boolean, required: false, default: false})
  private readonly flat!: boolean

  @Prop({type: String, required: false, default: ButtonTheme.PRIMARY})
  private readonly theme!: string

  @Prop({type: String, required: false, default: ButtonSize.NORMAL})
  private readonly size!: ButtonSize

  public onClick(): void {
    this.$emit('onClick', true)
  }
}
export default SButton
</script>

<style lang="scss">
  .button {
    overflow: auto;
    border: none;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    outline: 0;

    display: flex;
    gap: 5px;


    &--flat {
      box-shadow: none;
    }

    //Types
    &--primary {
      background: #00abdf;
    }

    &--secondary {
      background: #30475e;
    }

    &--transparent {
      background: transparent;
      color: #3a3a3a;
    }

    //Sizes
    &--normal {
      padding: 1rem;
      font-size: 1rem;
    }

    &--medium {
      padding: 0.6rem;
      font-size: .95rem;
    }

    &--small {
      padding: 0.4rem;
      font-size: .9rem;
    }
  }
</style>