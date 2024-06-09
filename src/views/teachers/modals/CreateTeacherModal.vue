<template>
  <div class="students__modals__create">
    <form @submit.prevent="onSubmit">
      <STextInput
          placeholder="First name"
          size="medium"
          type="text"
          label="First name"
          id="teacher_name"
          v-model="teacherData.firstName"
          flat
          required
      />

      <STextInput
          placeholder="Last name"
          size="medium"
          type="text"
          label="Last name"
          id="teacher_surname"
          v-model="teacherData.lastName"
          flat
          required
      />

      <STextInput
          placeholder="Phone"
          size="medium"
          type="number"
          label="Phone"
          id="teacher_phone"
          :errors="errors && errors.phone ? errors['phone'] : []"
          v-model="teacherData.phone"
          flat
          required
      />

      <STextInput
          placeholder="Email"
          size="medium"
          type="text"
          label="Email"
          :errors="errors && errors.email ? errors['email'] : []"
          id="teacher_email"
          v-model="teacherData.email"
          flat
      />

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
  TeacherData
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
  private updateTeacher!: (payload: { teacher: TeacherUpdateIntention, id: number }) => Promise<void>

  public isLoading = false
  public errors: Record<keyof TeacherData, string[]> | null = null

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

  public async  onSubmit (): Promise<void> {
    try {
      this.errors = null
      this.isLoading = true

      if (this.isUpdateMode) {
        await this.updateTeacher({
          teacher: this.teacherData as TeacherUpdateIntention,
          id: this.modalData.id
        })
      } else {
        await this.createTeacher({
          ...this.teacherData,
          email: this.teacherData.email || null
        } as Teacher)
      }

      this.closeModal(true)
    } catch (e) {
      console.log('Error occured', e)
      this.errors = e.payload
    } finally {
      this.isLoading = false
    }
  }
}
export default CreateTeacherModal
</script>
