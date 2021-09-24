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
          <SButton size="normal"  theme="transparent" flat border>
            <template v-slot:icon>
              <div class="options-icon"></div>
            </template>
          </SButton>
        </div>
      </div>
      <div class="layout__content__content">
        <slot name="content">

        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { SButton } from "@/shared/components/Button";

@Component({name: 'Layout', components: {STextInput, SButton}})
export class Layout extends Vue {

}
export default Layout
</script>

<style scoped>

</style>