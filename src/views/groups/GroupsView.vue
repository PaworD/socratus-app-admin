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
    <div v-if="!isLoading" class="groups__list">
      <GroupCard v-for="group in groups" :key="group.id" :group="group"
                 @onGroupDelete="fetchGroups" @onGroupUpdate="fetchGroups" />
    </div>

    <div v-else class="groups__list">
      <SSkeleton v-for="i in 5" :key="i" type="block" />
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {Action, Getter} from "vuex-class";

import { GroupCard } from "./components/GroupCard.vue";
import { AnyObject, Group, Pageable } from '@/shared/models'
import { SIconButton } from "@/shared/components/IconButton";
import { CreateGroupModal } from "@/views/groups/modals/CreateGroupModal.vue";
import { ModalSize } from "@/shared/abstract";
import { SSkeleton } from "@/shared/components";

@Component<GroupsView>({
  name: 'CoursesView',

  components: {
    SSkeleton,
    GroupCard,
    SIconButton
  },

  mounted (): void {
    this.load()
  }

})
export class GroupsView extends Vue {

  @Action
  private fetchGroups!: (query?: AnyObject) => Promise<Pageable>

  @Getter
  public groups!: Group[]

  public totalCount = 0
  public isLoading = false

  public get queryParams (): AnyObject {
    return this.$route.query
  }

  /**
   * Open createGroupModal and refreshes groups after closing
   */
  public openCreateGroupModal (): void {
    this.$modalService.open(CreateGroupModal, {}, { size: ModalSize.ExtraSmall, hasHeader: true, headerText: 'Create Group' }).then(() => {
      this.fetchGroups(this.queryParams).then((meta: Pageable) => {
        this.totalCount = meta.totalCount
      })
    })
  }

  public async load (): Promise<void> {
    try {
      this.isLoading = true
      await this.fetchGroups(this.queryParams)
    } finally {
      this.isLoading = false
    }
  }

}
export default GroupsView
</script>

<style lang="scss" scoped>

</style>
