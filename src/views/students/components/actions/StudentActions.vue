<template>
  <div>
    <SIconButton @onClick="openUpdateStudentModal({
      firstName: row.fullName.split(' ')[0],
      lastName: row.fullName.split(' ')[1],
      phone: row.phone,
      email: row.email,
      id: row.id
      })" borderless>
      <template v-slot:icon>
        <i class="bi-pen"></i>
      </template>
    </SIconButton>
    <SIconButton borderless @onClick="removeStudent(row.id)">
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
import { AnyObject, Identifier, Student } from '@/shared/models'
import { CreateStudentModal } from '@/views/students/modals/CreateStudentModal.vue'
import { ModalSize } from '@/shared/abstract'

@Component<StudentActions>({
  name: 'StudentActions',
  components: {
    SIconButton
  },

  mounted (): void {
    console.log(this.actions)
  }
})
export class StudentActions extends Vue {
  @Prop({type: Object, required: true})
  public readonly row!: TableRowItem

  @Prop({type: Object, required: false})
  public readonly actions!: AnyObject

  @Action
  public deleteStudent!: (id: number) => Promise<string>

  public removeStudent (id: number): void {
    this.deleteStudent(id).then(() => {
      this.actions.onDelete()
    })
  }

  public async openUpdateStudentModal (student: Student): Promise<void> {
    await this.$modalService.open(CreateStudentModal,
        {
          id: student.id,
          student: student
        },
        {
          hasHeader: true,
          size: ModalSize.ExtraSmall,
          persistent: false,
          headerText: 'Update Student'
        }).then(() => {
      this.actions.onUpdate()
    })
  }

}
export default StudentActions
</script>