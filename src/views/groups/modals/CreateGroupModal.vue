<template>
  <div class="groups__modals groups__modals__create">
    <form @submit.prevent="onSubmit">
      <label for="coursesList">Please select appropriate course</label>
      <SDropdown :list="coursesList" :value="coursesList[0].label" id="coursesList" @on-select="selectCourse"/>

      <label for="teachersList">Please assign teacher</label>
      <SDropdown :list="teachersList" :value="teachersList[0].label" id="teachersList" @on-select="selectTeacher"/>

      <label for="courseName">Enter name of the course</label>
      <STextInput placeholder="Group Name" size="medium" type="text" id="courseName" v-model="groupData.name" flat required/>

      <label for="courseColor">Assign color</label>
      <STextInput placeholder="Color" size="medium" type="text" id="courseColor" v-model="groupData.color" flat required/>
      <small>Please refer to <a href="https://imagecolorpicker.com/color-code" >this link</a> and copy color code . Ex: #00abdf</small>

      <SButton label="Create" theme="secondary" :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Action, Getter } from "vuex-class";

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import {
  SButton,
  STextInput,
  SDropdown,
  //
  DropdownItemProps
} from '@/shared/components'
import {Course, Group, Teacher} from "@/shared/models";

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmil.com>
 */
@Component<CreateGroupModal>({
  name: 'CreateGroupModal',

  components: {
    STextInput,
    SButton,
    SDropdown
  },

  mounted (): void {
    this.fetchCourses()
    this.fetchTeachers()
  }
})
export class CreateGroupModal extends ModalWrapper {

  @Action
  private createGroup!: (payload: Group) => Promise<void>
  @Action
  private fetchCourses!: () => Promise<void>
  @Action
  private fetchTeachers!: () => Promise<void>

  @Getter
  private courses!: Course[]
  @Getter
  private teachers!: Teacher[]

  /**
   * Contents of group
   */
  public groupData = {} as Group

  public isLoading = false

  public get coursesList (): DropdownItemProps[] {
    return [ {label: 'Select Course' , value: null}, ...this.courses!.map((course) => {
      return {
        label: course.name!,
        value: String(course.id)
      }
    })]
  }

  public get teachersList (): DropdownItemProps[] {
    return [ {label: 'Select Teacher' , value: null}, ...this.teachers!.map((teacher) => {
      return {
        label: `${teacher.firstName} ${teacher.lastName}`,
        value: String(teacher.id)
      }
    })]
  }

  /**
   * Handles submitting of form
   */
  public onSubmit (): void {
    this.isLoading = true
    this.createGroup(this.groupData).finally(() => {
      this.isLoading = false
    })
  }

  public selectCourse (courseId: string): void {
    this.groupData.course = Number(courseId)
  }

  public selectTeacher (teacherId: string): void {
    this.groupData.teacher = Number(teacherId)
  }

}
export default CreateGroupModal
</script>

<style lang="scss" scoped>

</style>