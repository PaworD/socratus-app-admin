<template>
  <div class="courses__modals courses__modals__create">
    <STextInput placeholder="Course name" size="medium" v-model="payload.name"/>
    <STextInput placeholder="Price" size="medium" v-model="payload.price"/>
    <SButton label="Create" size="normal" theme="secondary" flat @onClick="submit"/>
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

@Component({
  name: 'CreateCourseModal',
  components: {
    STextInput,
    SDropdown,
    SButton
  },

  mounted(): void {
    //
  },

  directives: {
    mask
  }
})
export class CreateCourseModal extends ModalWrapper {

  @Action
  public createCourse!: (payload: Course) => Promise<void>

  public payload: Course = {}

  public async submit (): Promise<void> {
    if (this.payload === {}) {
      return
    }
    console.log(this.payload.price)
    await this.createCourse({...this.payload, price: Number(this.payload.price)})
    this.closeModal(null)
  }

}
export default CreateCourseModal
</script>