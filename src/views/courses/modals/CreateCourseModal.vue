<template>
  <div class="courses__modals__create">
    <form @submit.prevent="submit">
      <div class="input-group">
        <label for="course-name">Write name for the course</label>
        <STextInput placeholder="Course name" flat size="medium" v-model="payload.name"
                    id="course-name" required/>
      </div>

      <div class="input-group">
        <label for="course-price">Define price for the course</label>
        <money class="Input__input --flat --medium" placeholder="Price"
               v-model.lazy="payload.price"
               id="course-price" v-bind="moneyMask" required/>
      </div>

      <div class="input-group">
        <label for="course-level">
          Define level for the course (Beginner)
        </label>
        <SDropdown value="Select level" :list="levels" @on-select="selectLevel" id="course-level"/>
      </div>


      <SButton :label="isUpdateMode ? 'Update' : 'Create'" size="medium" theme="secondary"
               :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import {Money} from 'v-money'

import {ModalWrapper} from "@/components/_abstract/ModalWrapper.vue";
import {SButton} from "@/shared/components/Button";
import {STextInput} from "@/shared/components/TextInput/TextInput.vue";
import {Action} from "vuex-class";
import {Course} from "@/shared/models";
import {DropdownItemProps, SDropdown} from '@/shared/components/Dropdown'
import {Levels} from '@/views/courses/contracts/levels'

@Component<CreateCourseModal>({
  name: 'CreateCourseModal',
  components: {
    STextInput,
    SDropdown,
    SButton,
    Money
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
})
export class CreateCourseModal extends ModalWrapper {
  @Action
  public createCourse!: (payload: Course) => Promise<void>

  @Action
  public updateCourse!: (payload: { course: Course, id: number }) => Promise<void>

  public payload: {
    name: string
    price: number
    priceCurrency?: string
    level?: string
  } = {
    name: "",
    price: 0,
  }

  public moneyMask = {
    precision: 0,
    decimal: ",",
    thousands: " ",
    prefix: "UZS ",
    masked: false
  }

  public isLoading = false

  public get levels(): DropdownItemProps[] {
    return Object.entries(Levels).map(([label, value]) => {
      return {
        label,
        value
      }
    })
  }

  /**
   * Sets appropriate level on selection
   * @param level
   */
  public selectLevel(level: DropdownItemProps): void {
    this.payload.level = String(level.value)
  }

  public async submit(): Promise<void> {
    this.isLoading = true

    try {
      if (this.isUpdateMode) {
        await this.updateCourse({
          course: this.payload as Course,
          id: this.modalData.id
        })
      } else {
        await this.createCourse({...this.payload as Course, price: Number(this.payload.price)})
      }

      this.closeModal(true)
    } catch (e) {
      console.log(e)
    } finally {
      this.isLoading = false
    }
  }

}

export default CreateCourseModal
</script>
