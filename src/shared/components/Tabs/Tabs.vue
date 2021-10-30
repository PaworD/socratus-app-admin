<template>
  <div class="tabs">
    <ul class='tabs__header'>
      <li v-for='(tab, index) in tabs' :class="[{'selected' : index === selected}]" :key='index' @click="select(index)" >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script lang="ts">

import { Vue , Component } from "vue-property-decorator";
import { STab } from "@/shared/components/Tabs/_";

@Component<STabs>({
  name: 'STabs',

  created (): void {
    this.tabs = this.$children as STab[]
  },

  mounted (): void {
    this.tabs[0].isActive = true
  }
})
export class STabs extends Vue {
  public selected = 0
  public tabs: STab[] = []

  public select (index: number) {
    this.selected = index

    this.tabs.forEach((tab, i) => {
      tab.isActive = (index === i)
    })
  }

}
export default STabs
</script>

<style lang="scss">

</style>