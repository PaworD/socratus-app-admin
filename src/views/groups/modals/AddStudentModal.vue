<template>
  <div class="groupStudents__students__modals__add_student">
    <SDropdown :list="filteredStudents" value="Select students" multiselect
               @on-select="addToSelectedStudents"/>

    {{ selectedStudents }}
    <SBadge v-for="student in selectedStudents" :key="student.id"
            :title="`${student.firstName} ${student.lastName}`" :onClose="() =>
            removeStudent(student)"/>

    <SIconButton @onClick="submitForm" >
      Add Student(s)
    </SIconButton>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import { Action, Getter } from 'vuex-class'
import { Student } from '@/shared/models'
import { SBadge, SIconButton, SDropdown, DropdownItemProps, SCard } from '@/shared/components'

@Component<AddStudentModal>({
  name: 'AddStudentModal',
  components: {
    SIconButton,
    SCard,
    SDropdown,
    SBadge
  },
  mounted (): void {
    this.fetchStudents()
  }

})
export class AddStudentModal extends ModalWrapper {

  @Action
  private fetchStudents!: () => Promise<void>

  @Action
  public addStudentsToGroup!: (data: { groupId: number, studentIds: number[]}) => Promise<void>

  @Getter
  private students!: Student[]

  public isLoading = false
  public selectedStudents: Student[] = []


  public get filteredStudents (): DropdownItemProps[] {
    let filteredStudents: Student[] = []
    if (Array.isArray(this.modalData.students) && this.modalData.students.length > 0 && this.students.length > 0) {
      filteredStudents = this.students.filter((student) => {
        return (this.modalData.students as Student[]).some(s => s.id !== student.id)
      })

      return [...filteredStudents.map((student) => {
        return {
          label: student.firstName + ' ' + student.lastName,
          value: String(student.id)
        }
      })]
    } else {
      return [...this.students.map((student) => {
        return {
          label: student.firstName + ' ' + student.lastName,
          value: String(student.id)
        }
      })]
    }
  }

  public get preparedStudents (): number[] {
    return [...this.selectedStudents.map(student => {
      return Number(student.id)
    })]
  }

  public addToSelectedStudents (item: DropdownItemProps): void {
    const student = this.students.filter((student) => { return student.id === Number(item.value) })[0]
    if (this.selectedStudents.some(st => st.id === student.id)) {
      return
    }
    console.log(student)

    this.selectedStudents.push(student)
  }

  public removeStudent (student: Student): void {
    const studentAsDropdownItem = {
      label: student.firstName + ' ' + student.lastName,
      value: String(student.id)
    }
    const studentIndex = this.filteredStudents.indexOf(studentAsDropdownItem)

    this.selectedStudents.splice(studentIndex, 1)
  }

  public submitForm (): void {
    this.isLoading = true
    this.addStudentsToGroup({ groupId: this.modalData.groupId, studentIds: [...this.preparedStudents] }).finally(() => {
      this.isLoading = false
      this.closeModal(null)
    })
  }


}
export default AddStudentModal
</script>