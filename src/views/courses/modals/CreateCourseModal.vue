<template>
  <div class=" courses__modals__create">
    <form @submit.prevent="submit">
      <div class="input-group">
        <label for="course-name">Write name for the course</label>
        <STextInput placeholder="Course name" flat size="medium" v-model="payload.name"
                    id="course-name" required />
      </div>

      <div class="input-group">
        <label for="course-price">Define price for the course</label>
        <STextInput placeholder="Price" flat size="medium" v-model="payload.price"
                    id="course-price" required />
      </div>

      <div class="input-group">
        <label for="course-level">
          Define level for the course (Beginner)
        </label>
        <STextInput placeholder="Price" flat size="medium" v-model="payload.level" id="course-level" />
      </div>


      <SButton :label="isUpdateMode ? 'Update' : 'Create'" size="medium" theme="secondary"
               :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator";
import { ModalWrapper } from "@/components/_abstract/ModalWrapper.vue";
import { SButton } from "@/shared/components/Button";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { Action } from "vuex-class";
import { Course } from "@/shared/models";
import { SDropdown } from "@/shared/components/Dropdown";
import { mask } from 'vue-the-mask'

@Component<CreateCourseModal>({
  name: 'CreateCourseModal',
  components: {
    STextInput,
    SDropdown,
    SButton
  },

  mounted(): void {
    if (this.isUpdateMode) {
      this.payload = {
        name: this.modalData.course.name,
        price: this.modalData.course.price,
        level: this.modalData.course.level
      }
    }
  },

  directives: {
    mask
  }
})
export class CreateCourseModal extends ModalWrapper {

  @Action
  public createCourse!: (payload: Course) => Promise<void>

  @Action
  public updateCourse!: (payload: { course: Course, id: number }) => Promise<void>

  public payload: Course = {} as Course

  public isLoading = false

  public submit (): void {
    if (this.isUpdateMode) {
      this.isLoading = true
      this.updateCourse({course: this.payload, id: this.modalData.id}).then(() => {
        this.isLoading = false
        this.closeModal(null)
      })
    } else {
      this.createCourse({...this.payload, price: Number(this.payload.price)}).then(() => {
        this.isLoading = false
        this.closeModal(null)
      })
    }

  }

}
export default CreateCourseModal
</script>