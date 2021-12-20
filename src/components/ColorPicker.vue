<template>
  <div class="color-picker">
    <input type="color" v-model="_value">
  </div>
</template>

<script lang="ts">

import { Component, PropSync, Vue } from 'vue-property-decorator'

/**
 *
 * @author javlon KHalimjonov <khalimjanov2000@gmail.com>
 */
@Component<ColorPicker>({
  name: 'ColorPicker'
})
export class ColorPicker extends Vue {
  @PropSync('value', { type: String, required: true })
  public _value!: string
}
export default ColorPicker
</script>