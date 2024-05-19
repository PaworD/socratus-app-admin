<template>
  <div class="sidebar__organization">
    <div class="sidebar__organization__logo">
      <img src="@/assets/org.png" alt="LOGO">
    </div>
    <div class="sidebar__organization__info">
      <p>{{ organization.name }}</p>
      <small>Claus-Krämer-Ring 36, Bramsche</small>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { Organization } from '@/views/contracts'

@Component({
  name: "OrganizationWidget"
})
export class OrganizationWidget extends Vue {
  @Getter
  public organization!: Organization
}
export default OrganizationWidget
</script>
