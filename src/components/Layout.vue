<template>
  <div class="layout">
    <div class="layout__sidebar">
      <slot name="sidebar">

      </slot>
    </div>
    <div class="layout__content">
      <div class="layout__content__header">
        <div class="layout__content__header__search">
          <STextInput placeholder="Search student/teacher/group..." size="small" flat/>
        </div>
        <div class="layout__content__header__actions">
            <SIconButton borderless @onClick="toggleSettingsBar">
              <template v-slot:icon>
                <i class="bi-toggles"></i>
              </template>
            </SIconButton>
        </div>
      </div>
      <div class="layout__content__content">
        <slot name="content">

        </slot>
      </div>
      <SettingsBar v-if="isSettingsBarOpen" @close="toggleSettingsBar" />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { SButton } from "@/shared/components/Button";
import { SIconButton } from "@/shared/components/IconButton"
import { SettingsBar } from '@/components/SettingsBar.vue'

@Component({name: 'Layout', components: {STextInput, SButton, SIconButton, SettingsBar}})
export class Layout extends Vue {

  public isSettingsBarOpen = false

  public toggleSettingsBar (): void {
    this.isSettingsBarOpen = !this.isSettingsBarOpen
  }
}
export default Layout
</script>

<style scoped>

</style>