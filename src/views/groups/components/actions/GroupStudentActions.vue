<template>
  <div>
    <SIconButton borderless @onClick="removeStudent">
      <template v-slot:icon>
        <i class="bi-trash"></i>
      </template>
    </SIconButton>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {SIconButton} from "@/shared/components";
import {TableRowItem} from "@/shared/components/Table/_";
import {Action} from "vuex-class";
import { AnyObject } from '@/shared/models'

@Component<GroupStudentActions>({
  name: 'StudentActions',
  components: {
    SIconButton
  }
})
export class GroupStudentActions extends Vue {
  @Prop({type: Object, required: true})
  public readonly row!: TableRowItem

  @Prop({type: Object, required: false})
  public readonly actions!: AnyObject

  @Action
  public removeStudentFromGroup!: (data: { groupId: number, studentId: number }) => Promise<void>

  public removeStudent (): void {
    this.removeStudentFromGroup({ groupId: this.actions.groupId, studentId: this.row.id }).then(() => {
      this.actions.onDelete(this.row.id)
    }).catch((e) => {
      console.warn(e)
    })
  }

}
export default GroupStudentActions
</script>