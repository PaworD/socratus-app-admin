<template>
  <aside class="sidebar">
    <ul class="sidebar__list">
      <li>
        <router-link to="/">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/courses">Courses</router-link>
      </li>
      <li>
        <router-link to="/groups">Groups</router-link>
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

@Component({name: 'Sidebar'})
export class Sidebar extends Vue {
  @Prop({type: Object, required: false})
  public readonly organization!: Organization
}
export default Sidebar
</script>

<style lang="scss" scoped>

</style>