<template>
  <component :is="component" v-bind="{ columnsCount, rowsCount, blockWidth }" />
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueConstructor } from 'vue'
import { skeletonRegistry, SkeletonType } from '@/shared/components/Skeleton/Skeleton.contracts'

@Component({
  name: "SSkeleton"
})
export class SSkeleton extends Vue {
  @Prop({ type: String, required: false, default: SkeletonType.Block })
  private readonly type!: SkeletonType

  @Prop( { type: Number, required: false, default: 4 })
  public readonly columnsCount!: number

  @Prop({ type: Number, required: false, default: 3 })
  public readonly rowsCount!: number

  @Prop( { type: Number, required: false, default: 70 })
  public readonly blockWidth!: number

  /**
   * Render appropriate skeleton fragment
   */
  public get component (): VueConstructor {
    return skeletonRegistry[this.type]
  }
}
export default SSkeleton
</script>