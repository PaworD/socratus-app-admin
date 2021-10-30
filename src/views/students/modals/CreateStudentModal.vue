<template>
  <div class="groups__modals groups__modals__create">
    <form @submit.prevent="onSubmit">
      <label for="student_name">Enter first name of the student</label>
      <STextInput placeholder="First name" size="medium" type="text" id="student_name" v-model="studentData.firstName" flat required/>

      <label for="student_surname">Enter last name of the student</label>
      <STextInput placeholder="Last name" size="medium" type="text" id="student_surname" v-model="studentData.lastName" flat required/>

      <label for="student_phone">Enter phone of the student</label>
      <STextInput placeholder="Phone" size="medium" type="phone" id="student_phone" v-model="studentData.phone" flat required/>

      <label for="student_email">Enter email of the student</label>
      <STextInput placeholder="Email" size="medium" type="email" id="student_email" v-model="studentData.email" flat required/>

      <SButton label="Create" theme="secondary" :isLoading="isLoading" flat/>
    </form>
  </div>
</template>

<script lang="ts">

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import { Component } from "vue-property-decorator";
import { STextInput, SDropdown, SButton} from "@/shared/components";
import {Student} from "@/shared/models";

@Component({
  name: 'CreateStudentModal',
  components: {
    STextInput,
    SDropdown,
    SButton
  }
})
export class CreateStudentModal extends ModalWrapper {


  public isLoading = false
  public studentData = {} as Student

  public onSubmit (): void {
    //
  }

}
export default CreateStudentModal
</script>