<template>
  <div class="checkbox">
    <div
        class="checkbox-custom-input-wrapper"
        :class="{'checkbox-custom-input-wrapper--checked': value}">
      <input
          :id="id"
          class="checkbox-hidden-input"
          type="checkbox"
          :checked="value"
          @input="onInput" />
      <span v-if="value" class="checkbox-custom-input" :class="{'checkbox-custom-input--checked': value}"></span>
    </div>
    <label class="label" :for="id">
      <slot />
    </label>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component({name: 'SCheck'})
export class SCheck extends Vue {
  @Prop({type: Boolean, required: false, default: false})
  private readonly value!: boolean

  @Prop({type: String, required: false})
  private readonly id!: string

  public onInput (event: any): void {
    this.$emit('input', event.target.checked)
  }


}
export default SCheck
</script>