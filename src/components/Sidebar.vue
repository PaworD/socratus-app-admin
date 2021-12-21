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
      <li v-for="addon in addonLinks" :key="addon.id">
        <router-link :to="'/addons/'+ addon.name">
          <i :class="addon.icon"></i>
          {{ addon.name }}
        </router-link>
      </li>
    </ul>
    <div class="sidebar__footer">
        v1.0.0-beta.2-develop
    </div>
  </aside>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { Organization } from "@/views/contracts";
import OrganizationWidget from '@/components/Organization.vue'
import { AddonData } from '@/shared/models'

@Component({
  name: 'Sidebar',
  components: {
    OrganizationWidget
  }
})
export class Sidebar extends Vue {
  @Prop({type: Object, required: false})
  public readonly organization!: Organization

  /**
   * TODO: Fetch from API or get from store.getters
   */
  public get addonLinks (): AddonData[] {
    return [
      {
        id: 10000,
        name: 'payments',
        isActive: true,
        icon: 'bi-cash-stack'
      },
      {
        id: 10001,
        name: 'quizes',
        isActive: false,
        icon: 'bi-puzzle'
      },
      {
        id: 10002,
        name: 'statistics',
        isActive: true,
        icon: 'bi-kanban'
      }
    ]
  }
}
export default Sidebar
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: $light !important;
}
</style>