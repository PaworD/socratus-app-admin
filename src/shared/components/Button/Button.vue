<template>
  <button
  @click="onClick"
  :data-tooltip="tooltip"
  :class="[ 'button ', `button--${theme}`, `button--${size}`, { 'button--flat' : flat },{'--loading': isLoading}]"
  >
      <div v-if="!$slots.icon && label" class="button--label">{{label}}</div>
      <div v-if="$slots.icon" class="button--icon"><slot name="icon"></slot></div>
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
  @Prop({type: String, required: false})
  private readonly label!: string

  @Prop({type: String, required: false})
  private readonly tooltip!: string

  @Prop({type: Boolean, required: false, default: false})
  private readonly flat!: boolean

  @Prop({type: String, required: false, default: ButtonTheme.PRIMARY})
  private readonly theme!: string

  @Prop({type: String, required: false, default: ButtonSize.NORMAL})
  private readonly size!: ButtonSize

  @Prop({type: Boolean, required: false, default: false})
  private readonly isLoading!: boolean

  public onClick(): void {
    this.$emit('onClick')
  }
}
export default SButton
</script>

<style lang="scss">
  .button {
    position: relative;
    overflow: visible;
    border: none;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    outline: 0;

    display: flex;
    gap: 5px;

    &.--loading &--label, &--icon {
      visibility: hidden;
      opacity: 0;
    }


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

    //States
    &.--loading {
      display: block;
      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
      }
    }
    @keyframes button-loading-spinner {
      from {
        transform: rotate(0turn);
      }

      to {
        transform: rotate(1turn);
      }
    }
  }
</style>