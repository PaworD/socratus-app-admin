<template>
  <div v-show='isActive'>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { Vue , Component, Prop } from "vue-property-decorator";

@Component({
  name: 'STab'
})
export class STab extends Vue {
  @Prop({type: String, required: true})
  public title!: string

  public isActive = false


}
export default STab
</script>