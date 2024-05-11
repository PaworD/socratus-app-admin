<template>
  <div class="Input">
    <label :for="id" class="sr-only">{{ hasLabel ? label : placeholder }}</label>
    <input v-bind="{ type, required, placeholder, value, id }" @input="updateSelf"
           :class="['Input__input', { '--flat' : flat, '--with-radius' : withRadius }, `--${size}` ]">

    <div v-if="hasErrors" class="Input__errors">
      <span v-for="error in errors" :key="error">{{ error }}</span>
    </div>
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

  @Prop( { type: Array, required: false, default: () => ([]) })
  public errors!: string[]

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

  public get hasErrors (): boolean {
    return this.errors.length > 0
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
