<template>
  <div>
    {{ resources }}
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Resource } from '@/shared/models'

@Component<Resources>({
  name: "Resources",

  mounted (): void {
    this.fetchResources()
  }
})
export class Resources extends Vue {

  @Action
  public fetchResources!: () => Promise<void>

  @Getter
  public resources!: Resource[]
}
export default Resources
</script>