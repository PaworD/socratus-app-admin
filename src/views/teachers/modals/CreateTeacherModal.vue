<template>
  <div class="students__modals__create">
    <form @submit.prevent="onSubmit">
      <div class="input-group">
        <label for="teacher_name">Enter first name of the teacher</label>
        <STextInput placeholder="First name" size="medium" type="text" id="teacher_name"
                    v-model="teacherData.firstName" flat required/>
      </div>

      <div class="input-group">
        <label for="teacher_surname">Enter last name of the teacher</label>
        <STextInput placeholder="Last name" size="medium" type="text" id="teacher_surname"
                    v-model="teacherData.lastName" flat required/>
      </div>

      <div class="input-group">
        <label for="teacher_phone">Enter phone of the teacher</label>
        <STextInput placeholder="Phone" size="medium" type="phone" id="teacher_phone"
                    v-model="teacherData.phone" flat required/>
      </div>

      <div class="input-group">
        <label for="teacher_email">Enter email of the teacher</label>
        <STextInput placeholder="Email" size="medium" type="email" id="teacher_email"
                    v-model="teacherData.email" flat/>
      </div>

      <SButton :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary" size="medium"
               :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import { Action } from 'vuex-class'
import { Component } from 'vue-property-decorator'
import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'

import {
  SBadge,
  SButton,
  SDropdown,
  STextInput
} from '@/shared/components'
import {
  Teacher,
  TeacherUpdateIntention,
  StudentUpdateIntention
} from '@/shared/models'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<CreateTeacherModal>({
  name: 'CreateTeacherModal',
  components: {
    STextInput,
    SDropdown,
    SButton,
    SBadge
  },

  mounted (): void {
    if (this.isUpdateMode) {
      this.teacherData = {
        email: this.modalData.teacher.email === '(not set)' ? undefined : this.modalData.teacher.email,
        firstName: this.modalData.teacher.firstName,
        lastName: this.modalData.teacher.lastName,
        phone: this.modalData.teacher.phone
      }
    }
  }
})
export class CreateTeacherModal extends ModalWrapper {

  @Action
  private createTeacher!: (student: Teacher) => Promise<void>

  @Action
  private updateTeacher!: (payload: { teacher: StudentUpdateIntention, id: number }) => Promise<void>

  public isLoading = false

  public teacherData : {
    email: string
    firstName: string
    lastName: string
    phone: string
  } = {
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  }

  public onSubmit (): void {
    this.isLoading = true
    if (this.isUpdateMode) {
      this.updateTeacher({
        teacher: this.teacherData as TeacherUpdateIntention,
        id: this.modalData.id
      }).then(() => {
        this.isLoading = true
        this.closeModal(null)
      })
    } else {
      this.createTeacher(this.teacherData as Teacher).then(() => {
        this.isLoading = true
        this.closeModal(null)
      })
    }
  }
}
export default CreateTeacherModal
</script>