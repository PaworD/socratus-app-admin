<template>
  <div class="Input">
    <label :for="id" class="sr-only">{{ hasLabel ? label : placeholder }}</label>
    <input v-bind="{ type, required, placeholder, value, id }" @input="updateSelf"
           :class="['Input__input', { '--flat' : flat, '--with-radius' : withRadius }, `--${size}` ]">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { v4 as uuid } from 'uuid'

import { InputSize, InputType, TextInputProps } from './TextInput.contracts'

/**
 * @author Javlon Khalimjonov <khalimajonov.code@gmail.com>
 */
@Component<STextInput>({ name: 'STextInput' })
export class STextInput extends Vue {
  /**
   * @see TextInputProps.flat
   */
  @Prop({ type: Boolean, required: false, default: false })
  private readonly flat!: TextInputProps['flat']

  /**
   * @see TextInputProps.label
   */
  @Prop({ type: Boolean, required: false })
  private readonly label?: TextInputProps['label']

  /**
   * @see TextInputProps.placeholder
   */
  @Prop({ type: String, required: false })
  private readonly placeholder!: TextInputProps['placeholder']

  /**
   * @see TextInputProps.value
   */
  @Prop({ type: String, required: false })
  private readonly value!: TextInputProps['value']

  /**
   * @see TextInputProps.size
   */
  @Prop({ type: String, required: false, default: InputSize.NORMAL })
  private readonly size!: TextInputProps['size']

  /**
   * @see TextInputProps.type
   */
  @Prop({ type: String, required: false, default: InputType.TEXT })
  private readonly type!: TextInputProps['type']

  /**
   * @see TextInputProps.required
   */
  @Prop({ type: Boolean, required: false, default: false })
  public readonly required!: TextInputProps['required']

  /**
   * @see TextInputProps.withRadius
   */
  @Prop({ type: Boolean, required: false, default: false })
  private readonly withRadius!: TextInputProps['withRadius']

  private readonly sizes = InputSize

  /**
   * Generates unique id's for each input group
   */
  public get id (): string {
    return uuid()
  }

  /**
   * Determines whether label id present.
   */
  public get hasLabel (): boolean {
    return typeof this.label !== 'undefined' && this.label.length > 0
  }

  /**
   * Handles event`@input`.
   */
  public updateSelf (e: any): void {
    this.$emit('input', e.target.value)
  }
}
export default STextInput
</script>

<style lang="scss">
.Input {
  &__input {
    width: 100%;
    background: #fff;
    font: inherit;
    outline: none;
    border: 2px solid $dark;
    transition: all .3s ease;

    padding-left: .7rem;

    &::placeholder {
      color: $ft-light;
    }

    &:focus {
      border: 2px solid #3a3a3a;
    }

    &.--with-radius {
      border-radius: 5px;
    }

    &.--flat {
      box-shadow: none;
      border: none;

      color: $ft-light;
      background: $gray-10;

      &:focus {
        border: none;
      }
    }

    //Sizes
    &.--normal {
      padding: 18px 14px;
    }

    &.--medium {
      padding: 12px 8px;
    }

    &.--small {
      padding: 8px 4px;
      font-size: .8rem;
    }
  }
}
</style>