<template>
  <aside class="sidebar">
    <OrganizationWidget />
    <ul class="sidebar__list">
      <li>
        <router-link to="/" active-class="sidebar__list__active">
          <i class="bi-speedometer2"></i>
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
      <li v-if="myAddons.length">
        <hr>
      </li>
      <li v-for="addon in myAddons" :key="addon.id">
        <router-link :to="'/addons/'+ addon.name">
          <i :class="addon.iconName"></i>
          {{ addon.displayName }}
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
import { Getter } from 'vuex-class'

@Component({
  name: 'Sidebar',
  components: {
    OrganizationWidget
  }
})
export class Sidebar extends Vue {
  @Prop({type: Object, required: false})
  public readonly organization!: Organization

  @Getter
  public readonly myAddons!: AddonData[]
}
export default Sidebar
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: $light !important;
}
</style>
