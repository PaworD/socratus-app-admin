<template>
  <input :type="type" :class="['input', {
    'input--flat' : flat
  }, {
    'input--small' : size == sizes.SMALL,
    'input--medium' : size == sizes.MEDIUM,
    'input--normal' : size == sizes.NORMAL
  }]" :placeholder="placeholder" :value="value" @input="updateSelf">
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import {InputSize, InputType} from './TextInput.contracts'

/**
 * @author Javlon Khalimjonov <khalimajonov.code@gmail.com>
 */

@Component<STextInput>({name: 'STextInput'})
export class STextInput extends Vue {

  @Prop({type: String, required: false})
  private readonly placeholder!: string

  @Prop({type: String, required: false})
  private readonly value!: string

  @Prop({type: Boolean, required: false, default: false})
  private readonly flat!: boolean

  @Prop({type: String, required: false, default: InputSize.NORMAL})
  private readonly size!: InputSize

  @Prop({type: String, required: false})
  private readonly type!: InputType

  private readonly sizes = InputSize

  public updateSelf($event: any) {
    this.$emit("input", $event.target.value);
  }

}

export default STextInput
</script>

<style lang="scss">
  .input {
    width: 100%;
		background: #fff;
		font: inherit;
		outline: 0;
    border: 2px solid $dark;
    transition: all .3s ease;

    &:focus {
      border: 2px solid #3a3a3a;
    }

    &--flat {
      box-shadow: none;
      border-bottom: 1px solid #3a3a3a;
    }

    //Sizes
    &--normal {
      padding: 18px 14px;
    }

    &--medium {
      padding: 12px 8px;
    }

    &--small {
      padding: 8px 4px;
    }
  }
</style>