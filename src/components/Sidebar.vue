<template>
  <aside class="sidebar">
    <OrganizationWidget />
    <ul class="sidebar__list">
      <li>
        <router-link to="/" active-class="sidebar__list__active">
          <i class="bi-layout-wtf"></i>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="/applicants">
          <i class="bi-tags"></i>
          Applicants
        </router-link>
      </li>
      <li>
        <router-link to="/courses">
          <i class="bi-files"></i>
          Courses
        </router-link>
      </li>
      <li>
        <router-link to="/students">
          <i class="bi-people"></i>
          Students
        </router-link>
      </li>
      <li>
        <router-link to="/groups">
          <i class="bi-diagram-2"></i>
          Groups
        </router-link>
      </li>
      <li>
        <router-link to="/teachers">
          <i class="bi-people"></i>
          Teachers
        </router-link>
      </li>
      <li>
        <hr>
      </li>
      <!-- TODO: Implement router guard for addon paths -->
      <li>
        <router-link to="/addons/payments">
          <i class="bi-cash-stack"></i>
          Payments
        </router-link>
      </li>
      <li>
        <router-link to="/addons/payments">
          <i class="bi-puzzle"></i>
          Quizes <small style="background: #ccc; border-radius: 10px; padding: 0 .5rem"><strong>beta</strong></small>
        </router-link>
      </li>
    </ul>
    <div class="sidebar__footer">
        v1.0.0-rc.1-build
    </div>
  </aside>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { Organization } from "@/views/contracts";
import OrganizationWidget from '@/components/Organization.vue'

@Component({
  name: 'Sidebar',
  components: {
    OrganizationWidget
  }
})
export class Sidebar extends Vue {
  @Prop({type: Object, required: false})
  public readonly organization!: Organization
}
export default Sidebar
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: $light !important;
}
</style>