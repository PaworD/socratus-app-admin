<template>
  <div class="layout">
    <div class="layout__sidebar">
      <slot name="sidebar">

      </slot>
    </div>
    <div class="layout__content">
      <div class="layout__content__header">
        <div class="layout__content__header__search">
          <GlobalSearch />
        </div>
        <div class="layout__content__header__actions">
            <SIconButton borderless @onClick="toggleSettingsBar">
              <template v-slot:icon>
                <i class="bi-toggles"></i>
              </template>
            </SIconButton>
          <SIconButton borderless @onClick="openLogoutModal">
            <template v-slot:icon>
              <i class="bi-arrow-right-square"></i>
            </template>
          </SIconButton>
        </div>
      </div>
      <div class="layout__content__content">
        <slot name="content"></slot>
      </div>
      <SettingsBar v-if="isSettingsBarOpen" @close="toggleSettingsBar" />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { GlobalSearch } from '@/components/SearchBar.vue';
import { SButton } from "@/shared/components/Button";
import { SIconButton } from "@/shared/components/IconButton"
import { SettingsBar } from '@/components/SettingsBar.vue'
import { ModalSize } from '@/shared/abstract'
import { AnyObject } from '@/shared/models'
import LogoutModal from '@/components/LogoutModal.vue'

@Component({name: 'Layout', components: { GlobalSearch, SButton, SIconButton, SettingsBar }})
export class Layout extends Vue {

  public isSettingsBarOpen = false

  public toggleSettingsBar (): void {
    this.isSettingsBarOpen = !this.isSettingsBarOpen
  }

  public openLogoutModal (): void {
    this.$modalService.open(LogoutModal, {}, {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true,
          headerText: 'Log out'
        }
      ).then((data: AnyObject) => {
        if (data.success) {
          window.location.reload()
        }
    })
  }
}
export default Layout
</script>

<style scoped>

</style>