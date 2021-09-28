<template>
  <aside class="sidebar">
    <div class="sidebar__organization">
      <div class="sidebar__organization__logo">
        <img src="@/assets/courses/math.jpg" alt="LOGO">
      </div>
      <div class="sidebar__organization__info">
          <p>Organization Name</p>
          <small>ID #000090</small>
      </div>
    </div>
    <ul class="sidebar__list">
      <li>
        <router-link to="/" active-class="sidebar__list__active">
          <i class="bi-layout-wtf"></i>
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link to="courses">
          <i class="bi-files"></i>
          Courses
        </router-link>
      </li>
      <li>
        <router-link to="groups">
          <i class="bi-people"></i>
          Groups
        </router-link>
      </li>
      <li>
        <router-link to="teachers">
          <i class="bi-people"></i>
          Teachers
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

@Component({name: 'Sidebar'})
export class Sidebar extends Vue {
  @Prop({type: Object, required: false})
  public readonly organization!: Organization
}
export default Sidebar
</script>

<style lang="scss" scoped>

</style>