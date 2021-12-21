<template>
  <div>
    <div>
      <h4 v-if="hasTitle">{{ title }}</h4>
    </div>
    <div>
      {{ data }}
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'DashboardCard'
})
export class DashboardCard extends Vue {
  @Prop({ type: String, required: false, default: undefined })
  public readonly title!: string | undefined

  @Prop({ type: String, required: true })
  public readonly data!: string

  /**
   * Checks whether card has title
   */
  public get hasTitle (): boolean {
    return typeof this.title !== 'undefined'
  }
}
export default DashboardCard
</script>

<style lang="scss" scoped>

</style>