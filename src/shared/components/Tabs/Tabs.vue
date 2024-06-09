<template>
  <div class="tabs">
    <ul class='tabs__header'>
      <li v-for='(tab, index) in tabs' :class="{'selected' : tab.refKey === activeTab}" :key='index' @click="select(tab.refKey)">
        {{ tab.title }}
      </li>
    </ul>
    <slot v-bind="{ activeTab }"></slot>
  </div>
</template>

<script lang="ts">

import {Vue, Component} from "vue-property-decorator";
import {STab} from "@/shared/components/Tabs/_";

@Component<STabs>({
  name: 'STabs',
  created(): void {
    this.tabs = this.$children as STab[]
  },
})
export class STabs extends Vue {
  public tabs: STab[] = []

  public select(title: string): void {
    this.$router.push({
      path: this.$route.path,
      hash: title
    })
  }

  public get activeTab(): string {
    return this.$route.hash.length > 0
        ? this.$route.hash.split('#')[1]
        : this.tabs.find(el => el.isActive)?.refKey ?? ""
  }
}
export default STabs
</script>

<style lang="scss">

</style>
