<template>
  <div>
    <SIconButton borderless>
      <template v-slot:icon>
        <i class="bi-plus-circle"></i>
        Create
      </template>
    </SIconButton>
    <div>
      <ul>
        <li v-for="resource in resources" :key="resource.id">{{ resource.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { Resource } from '@/shared/models'
import { SIconButton } from '@/shared/components'

@Component<Resources>({
  name: "Resources",
  components: {
   SIconButton
  },

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