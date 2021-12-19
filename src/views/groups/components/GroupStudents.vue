<template>
  <div class="groupStudents">
    <div class="groupStudents__lead">
      <div class="students__lead__options">
        <SIconButton @onClick="openAddStudentModal">
          <template v-slot:icon>
            <i class="bi-plus-circle"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <div class="groupStudents__students_table">
      <STable :rows="rows" :isLoading="_isLoading" :routeName="'GroupStudents'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import { SIconButton, STable } from '@/shared/components'
import { Group } from '@/shared/models'
import { TableRowItem } from '@/shared/components/Table/_'
import { StudentActions } from '@/views/students/components/actions'
import { AddStudentModal } from '@/views/groups/modals/AddStudentModal.vue'
import { ModalSize } from '@/shared/abstract'
import { GroupStudentActions } from '@/views/groups/components/actions'

@Component<GroupStudents>({
  name: 'GroupStudents',
  components: {
    STable,
    SIconButton
  },
})
export class GroupStudents extends Vue {

  @PropSync( 'group', { type: Object, required: false, default: () => ({}) })
  private _group!: Group

  @PropSync( 'loading', { type: Boolean, required: false, default: false })
  public readonly _isLoading!: boolean

  public get rows (): TableRowItem[] {
    if (typeof this._group.students === 'undefined') {
      return []
    }

    return this._group.students.map(student => {
      return {
        id: student.id,
        fullName: `${student.firstName} ${student.lastName}`,
        phone: student.phone,
        email: student.email ?? '(not set)',
        actions: [
          {
            component: GroupStudentActions,
            onDelete: this.onDelete,
            groupId: this._group.id
          }
        ]
      }
    })
  }

  public onDelete (id: number): void {
    const student = this._group.students.filter((student) => student.id === id)

    if ( Array.isArray(student) && student.length > 0) {
      const indexOfStudent = this._group.students.indexOf(student[0])

      this._group.students.splice(indexOfStudent, 1)
    } else {
      return
    }
  }

  public openAddStudentModal (): void {
    this.$modalService.open(
        AddStudentModal,
        {
          groupId: this._group.id,
          students: this._group.students
        },
        {
          hasHeader: true,
          headerText: 'Add Student Modal',
          persistent: true,
          size: ModalSize.ExtraSmall,
        })
  }
}
export default GroupStudents
</script>