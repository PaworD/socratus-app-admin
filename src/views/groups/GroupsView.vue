<template>
  <div class="groups">
    <div class="groups__lead">
      <h2>Groups</h2>
      <SIconButton @onClick="openCreateGroupModal">
        <template v-slot:icon>
          <i class="bi-plus-circle"></i>
        </template>
      </SIconButton>
    </div>
    <div class="groups__list">
      <GroupCard v-for="group in groups" :key="group.id" :group="group" />
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {Action, Getter} from "vuex-class";

import { GroupCard } from "./components/GroupCard.vue";
import { Group } from "@/shared/models";
import { SIconButton } from "@/shared/components/IconButton";
import { CreateGroupModal } from "@/views/groups/modals/CreateGroupModal.vue";
import { ModalSize } from "@/shared/abstract";

@Component<GroupsView>({
  name: 'CoursesView',

  components: {
    GroupCard,
    SIconButton
  },

  mounted (): void {
    this.fetchGroups()
  }

})
export class GroupsView extends Vue {

  @Action
  private fetchGroups!: () => Promise<void>

  @Getter
  public groups!: Group[]

  /**
   * Open createGroupModal and refreshes groups after closing
   */
  public openCreateGroupModal (): void {
    this.$modalService.open(CreateGroupModal, {}, { size: ModalSize.ExtraSmall, hasHeader: true, headerText: 'Create Group' }).then(() => {
      this.fetchGroups()
    })
  }

}
export default GroupsView
</script>

<style lang="scss" scoped>

</style>