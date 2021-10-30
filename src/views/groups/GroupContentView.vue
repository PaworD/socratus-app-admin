<template>
  <div>
    <STabs>
      <STab v-for="(tab, index) in tabs" :key="index" :title="tab.title">
        <component :is="tab.component" />
      </STab>
    </STabs>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

import { STabs, STab } from '@/shared/components'
import CreateGroupModal from "@/views/groups/modals/CreateGroupModal.vue";
import GroupsView from "@/views/groups/GroupsView.vue";

@Component<GroupContentView>({
  name: 'GroupContentView',

  components: {
    STabs,
    STab
  }
})
export class GroupContentView extends Vue {

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
        component: CreateGroupModal
      },
      {
        title: 'Students list',
        component: GroupsView
      },
      {
        title: 'Attendance',
        component: CreateGroupModal
      }
    ]
  }
}
export default GroupContentView
</script>