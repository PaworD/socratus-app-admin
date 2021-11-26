<template>
  <div>
    Hello From Block skeleton
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: "BlockSkeleton"
})
export class BlockSkeleton extends Vue {
  @Prop({ type: Number, required: false, default: 70 })
  public readonly blockWidth!: number
}
export default BlockSkeleton
</script>