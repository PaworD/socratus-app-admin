<template>
  <div class="students__modals__create">
    <form @submit.prevent="onSubmit">
      <STextInput
          placeholder="First name"
          size="medium"
          type="text"
          label="First name"
          id="student_name"
          v-model="studentData.firstName"
          flat
          required
      />

      <STextInput
          placeholder="Last name"
          label="Last name"
          size="medium"
          type="text"
          id="student_surname"
          v-model="studentData.lastName"
          flat
          required
      />

      <STextInput
          placeholder="Phone"
          size="medium"
          type="phone"
          label="Phone number"
          :errors="errors && errors.phone ? errors.phone : []"
          id="student_phone"
          v-model="studentData.phone"
          flat
          required/>

      <STextInput
          placeholder="Email"
          label="Enter email of the student"
          size="medium"
          type="email"
          id="student_email"
          v-model="studentData.email"
          flat
      />

      <div v-if="!isUpdateMode" class="input-group">
        <label for="student_group">Select group to add student in</label>
        <SDropdown :list="groupsList" :value="groupsList[0].label" placeholder="Student group"
                   id="student_group" @on-select="onGroupSelect" multiselect/>
        <div class="students__modals__create__groups">
          <SBadge v-for="group in selectedGroups" :key="group" :title="String(group.label)"
                  theme="light" @close="removeGroup(group)" closable/>
        </div>
      </div>

      <SButton :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary" size="medium"
               :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import {ModalWrapper} from '@/components/_abstract/ModalWrapper.vue'
import {Component} from 'vue-property-decorator'
import {SBadge, STextInput, SDropdown, SButton, DropdownItemProps} from '@/shared/components'
import {CreateStudentIntention, Group, Student, StudentData, StudentUpdateIntention} from '@/shared/models'
import {Action, Getter} from 'vuex-class'

@Component<CreateStudentModal>({
  name: 'CreateStudentModal',
  components: {
    STextInput,
    SDropdown,
    SButton,
    SBadge
  },

  mounted(): void {
    this.fetchGroups()

    if (this.isUpdateMode) {
      this.studentData = {
        email: this.modalData.student.email === '(not set)' ? undefined : this.modalData.student.email,
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
  private createStudent!: (student: CreateStudentIntention) => Promise<void>

  @Action
  private updateStudent!: (payload: { student: StudentUpdateIntention, id: number }) => Promise<void>

  @Action
  private fetchGroups!: () => Promise<void>

  @Getter
  private groups!: Group[]

  public isLoading = false
  public selectedGroups: DropdownItemProps[] = []
  public errors: Record<keyof StudentData, string[]> | null = null
  public studentData: CreateStudentIntention = {
    email: '',
    firstName: '',
    groups: [],
    lastName: '',
    phone: ''
  }

  public get groupsList(): DropdownItemProps[] {
    if (!this.groups) {
      return []
    }

    return [
      {label: 'Choose groups...', value: ''},
      ...this.groups.map((group) => {
        return {
          label: String(group.name),
          value: String(group.id)
        }
      })]
  }

  public onGroupSelect(item: DropdownItemProps): void {
    if (typeof this.studentData.groups === 'undefined') {
      return
    }

    this.studentData.groups.push(Number(item.value))
    this.selectedGroups.push(item)
  }

  public async onSubmit(): Promise<void> {
    try {
      this.errors = null
      this.isLoading = true

      if (this.isUpdateMode) {
        await this.updateStudent({
          student: this.studentData as StudentUpdateIntention,
          id: this.modalData.id
        })
      } else {
        await this.createStudent({
          ...this.studentData,
          email: this.studentData.email || null
        })
      }

      this.closeModal(true)

    } catch (e) {
      this.errors = e.payload
    } finally {
      this.isLoading = false
    }
  }

  public removeGroup(group: DropdownItemProps): void {
    if (typeof this.studentData.groups === 'undefined') {
      return
    }

    const removableGroup = this.studentData.groups.indexOf((Number(group.value)))
    const removableSelected = this.selectedGroups.indexOf(group)

    this.studentData.groups.splice(removableGroup, 1)
    this.selectedGroups.splice(removableSelected, 1)

  }

}

export default CreateStudentModal
</script>
