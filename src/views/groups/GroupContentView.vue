<template>
    <STabs>
      <STab v-for="(tab, index) in tabs" :key="index" :title="tab.title">
        <component :is="tab.component" v-bind="{ group }" />
      </STab>
    </STabs>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from 'vuex-class'

import { STabs, STab } from '@/shared/components'
import { Group } from '@/shared/models'

import { GroupStudents } from './components/GroupStudents.vue'
import { GroupSchedule } from './components/GroupSchedule.vue'
import { GroupAttendance } from './components/GroupAttendance.vue'

@Component<GroupContentView>({
  name: 'GroupContentView',

  components: {
    STabs,
    STab
  },

  mounted (): void {
    this.fetchGroups()
  }
})
export class GroupContentView extends Vue {

  @Action
  private fetchGroups!: () => Promise<void>

  @Getter
  private groups!: Group[]

  public get group (): Group {
    return this.groups.filter(group => group.id === Number(this.$route.params.id))[0]
  }

  /**
   * Tabs to be rendered
   *
   * TODO Please note that return type of getter is not defined
   * and should be changed in the future.
   *
   * TODO Tabs components has not been designed to be used in a current way,
   * make changes in `Storybook`s components and come back here to check
   *
   * NOTE! Always double check `Tabs` component if you change something inside
   *
   * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
   */
  public get tabs () {
    return [
      {
        title: 'Schedule',
        component: GroupSchedule
      },
      {
        title: 'Students list',
        component: GroupStudents
      },
      {
        title: 'Attendance',
        component: GroupAttendance
      }
    ]
  }
}
export default GroupContentView
</script>