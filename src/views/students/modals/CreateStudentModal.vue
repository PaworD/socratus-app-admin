<template>
  <div class="students__modals__create">
    <form @submit.prevent="onSubmit">
      <div class="input-group">
        <label for="student_name">Enter first name of the student</label>
        <STextInput placeholder="First name" size="medium" type="text" id="student_name" v-model="studentData.firstName" flat required/>
      </div>

      <div class="input-group">
        <label for="student_surname">Enter last name of the student</label>
        <STextInput placeholder="Last name" size="medium" type="text" id="student_surname" v-model="studentData.lastName" flat required/>
      </div>

      <div class="input-group">
        <label for="student_phone">Enter phone of the student</label>
        <STextInput placeholder="Phone" size="medium" type="phone" id="student_phone" v-model="studentData.phone" flat required/>
      </div>

      <div class="input-group">
        <label for="student_email">Enter email of the student</label>
        <STextInput placeholder="Email" size="medium" type="email" id="student_email" v-model="studentData.email" flat/>
      </div>


      <div v-if="!isUpdateMode" class="input-group">
        <label for="student_group">Select group to add student in</label>
        <SDropdown :list="groupsList" :value="groupsList[0].label" placeholder="Student group"
                    id="student_group" @on-select="onGroupSelect" multiselect/>

        <SBadge v-for="group in studentData.groups" :key="group" :title="group"
                :onClose="() => removeGroup(group)"/>
      </div>

      <SButton :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary" size="medium"
               :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import { Component } from 'vue-property-decorator'
import { SBadge, STextInput, SDropdown, SButton, DropdownItemProps } from '@/shared/components'
import { Group, Student, StudentUpdateIntention } from '@/shared/models'
import { Action, Getter } from 'vuex-class'

@Component<CreateStudentModal>({
  name: 'CreateStudentModal',
  components: {
    STextInput,
    SDropdown,
    SButton,
    SBadge
  },

  mounted (): void {
    this.fetchGroups()

    if (this.isUpdateMode) {
      this.studentData = {
        email: this.modalData.student.email === '(not set)' ? undefined :
            this.modalData.student.email,
        firstName: this.modalData.student.firstName,
        lastName: this.modalData.student.lastName,
        phone: this.modalData.student.phone,
        groups: []
      }
    }
}
})
export class CreateStudentModal extends ModalWrapper {

  @Action
  private createStudent!: (student: Student) => Promise<void>

  @Action
  private updateStudent!: (payload: { student: StudentUpdateIntention, id: number }) => Promise<void>

  @Action
  private fetchGroups!: () => Promise<void>

  @Getter
  private groups!: Group[]

  public isLoading = false
  public studentData : {
    email: string
    firstName: string
    lastName: string
    phone: string
    groups?: number[]
  } = {
    email: '',
    firstName: '',
    groups: [],
    lastName: '',
    phone: ''
  }

  public get groupsList (): DropdownItemProps[] {
    if (!this.groups) {
      return []
    }

    return [
      { label: 'Choose groups...', value: null },...this.groups.map((group) => {
      return {
        label: String(group.name),
        value: String(group.id)
      }
    })]
  }

  public onGroupSelect (item: DropdownItemProps): void {
    if (typeof this.studentData.groups === 'undefined') {
      return
    }
    this.studentData.groups.push(Number(item.value))
  }

  public onSubmit (): void {
    this.isLoading = true
    if (this.isUpdateMode) {
      this.updateStudent({
        student: this.studentData as StudentUpdateIntention,
        id: this.modalData.id
      }).then(() => {
        this.isLoading = true
        this.closeModal(null)
      })
    } else {
      this.createStudent(this.studentData).then(() => {
        this.isLoading = true
        this.closeModal(null)
      })
    }
  }

  public removeGroup (group: number): void {
    if (typeof this.studentData.groups === 'undefined') {
      return
    }

    const removableGroup = this.studentData.groups.indexOf(group)

    this.studentData.groups.splice(removableGroup, 1)

  }

}
export default CreateStudentModal
</script>