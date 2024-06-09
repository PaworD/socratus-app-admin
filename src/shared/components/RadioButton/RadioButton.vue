<template>
  <label class="radio">
    <input class="radio__input" :name="model" type="radio" :value="value" v-model="radioValue"/>
    <span class="radio__label">{{ label }}</span>
  </label>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */

@Component({name: 'SRadio'})
export class SRadio extends Vue {
  @Prop({ type: String, required: true })
  private readonly label!: string

  @Prop({ type: String, required: true })
  private readonly value!: string

  @Prop({ type: [String, Number], required: true })
  private readonly model!: string

  public get radioValue (): string {
    return this.model
  }

  public set radioValue (value: string) {
    this.$emit('changed', value)
  }
}
export default SRadio
</script>
