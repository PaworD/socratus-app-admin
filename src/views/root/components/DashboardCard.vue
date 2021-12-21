<template>
  <div class="dc">
    <div class="dc__title">
      <h3 v-if="hasTitle">{{ title }}</h3>
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
.dc {
  width: 100%;
  height: 100%;

  border-radius: 10px;

  box-shadow: 0 0 10px 5px $light;

  padding: 1rem;

  display: flex;
  flex-flow: column;
  justify-content: space-between;

  &__title {

  }

}
</style>