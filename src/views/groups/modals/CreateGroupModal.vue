<template>
  <div class="groups__modals groups__modals__create">
    <form @submit.prevent="onSubmit">
      <div v-if="!isUpdateMode" class="input-group">
        <label for="coursesList">Please select appropriate course</label>
        <SDropdown :list="coursesList"
                   :value="coursesList[0].label"
                   id="coursesList"
                   @on-select="selectCourse"/>
      </div>

      <div class="input-group">
        <label for="teachersList">Please assign teacher</label>
        <SDropdown :list="teachersList"
                   :value="hasTeacher ? selectedTeacher.label : teachersList[0].label"
                   id="teachersList"
                   @on-select="selectTeacher"/>
      </div>

      <div class="input-group">
        <label for="courseName">Enter name of the course</label>
        <STextInput placeholder="Group Name" size="medium" type="text" id="courseName" v-model="groupData.name" flat required/>
      </div>

      <div class="input-group">
        <label for="courseColor">Assign color</label>
        <ColorPicker :value.sync="groupData.color" id="courseColor" />
      </div>
      <SButton :size="'medium'" :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary"
               :isLoading="isLoading" flat/>
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
import { Course, Group, GroupUpdateIntention, Teacher } from '@/shared/models'
import ColorPicker from '@/components/ColorPicker.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmil.com>
 */
@Component<CreateGroupModal>({
  name: 'CreateGroupModal',

  components: {
    STextInput,
    SButton,
    SDropdown,
    ColorPicker
  },

  created (): void {
    if (this.isUpdateMode) {
      this.groupData = {
        id: this.modalData.group.color,
        color: this.modalData.group.color,
        teacher: this.modalData.group.teacher,
        name: this.modalData.group.name
      } as Group
    }
  },

  mounted (): void {
    if (!this.isUpdateMode) {
      this.fetchCourses()
      this.fetchTeachers()
    } else {
      this.fetchTeachers()
    }
  }
})
export class CreateGroupModal extends ModalWrapper {

  @Action
  private createGroup!: (payload: Group) => Promise<void>
  @Action
  private fetchCourses!: () => Promise<void>
  @Action
  private fetchTeachers!: () => Promise<void>
  @Action
  private updateGroup!: (payload: { group: Group, id: number }) => Promise<void>

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

  public get hasTeacher (): boolean {
    if (this.isUpdateMode) {
     return typeof this.groupData.teacher !== 'undefined'
    }
    return false
  }

  public get selectedTeacher (): DropdownItemProps {
    if (!Number.isInteger(this.groupData.teacher) && this.hasTeacher) {
      const teacher = this.teachers.filter((t) => t.id === (this.groupData.teacher as Teacher).id)[0]
      if (this.isUpdateMode) {
        return {
          label: teacher.firstName + ' ' + teacher.lastName,
          value: String(teacher.id)
        }
      }

    }
    return {} as DropdownItemProps
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
  public async onSubmit (): Promise<void> {
    this.isLoading = true

    try {
      if (this.isUpdateMode) {
        await this.updateGroup({
          group: {
            ...this.groupData,
            teacher: (this.groupData.teacher as Teacher).id
          },
          id: this.modalData.id })
      } else {
        await this.createGroup(this.groupData)
      }

      this.closeModal(true)
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }

  public selectCourse (course: DropdownItemProps): void {
    this.groupData.course = Number(course.value)
  }

  public selectTeacher (teacher: DropdownItemProps): void {
    this.groupData.teacher = Number(teacher.value)
  }

}
export default CreateGroupModal
</script>

<style lang="scss" scoped>

</style>
