<template>
  <div>
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

  @Prop({type: String, required: true})
  public refKey!: string

  @Prop({type: Boolean, required: true})
  public isActive!: boolean
}
export default STab
</script>
