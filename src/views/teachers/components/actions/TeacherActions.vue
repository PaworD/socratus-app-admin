<template>
  <div>
    <SIconButton borderless>
      <template v-slot:icon>
        <i class="bi-pen"></i>
      </template>
    </SIconButton>
    <SIconButton @onClick="removeTeacher" borderless>
      <template v-slot:icon>
        <i class="bi-trash"></i>
      </template>
    </SIconButton>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { SIconButton } from '@/shared/components'
import { TableRowItem } from '@/shared/components/Table/_'
import { AnyObject } from '@/shared/models'
import { Action } from 'vuex-class'
import { DeleteModal } from '@/shared/modals'
import { ModalSize } from '@/shared/abstract'

@Component({
  name: 'TeacherActions',
  components: {
    SIconButton
  }
})
export class TeacherActions extends Vue {
  @Prop({type: Object, required: true})
  public readonly row!: TableRowItem

  @Prop({type: Object, required: false})
  public readonly actions!: AnyObject

  @Action
  public deleteTeacher!: (id: number) => Promise<string>

  public removeTeacher (): void {
    this.$modalService.open(DeleteModal,
        {
          id: this.row.id,
          module: 'teacher',
          message: `Are you sure to delete teacher: ${this.row.fullName} `
        },
        {
          hasHeader: true,
          size: ModalSize.ExtraSmall,
          persistent: false
        }).then(() => {
      this.actions.onDelete()
    })
  }
}
export default TeacherActions
</script>