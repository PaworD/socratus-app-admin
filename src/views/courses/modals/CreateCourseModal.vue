<template>
  <div class="courses__modals courses__modals__create">
    <STextInput placeholder="Course name" size="medium"/>
    <STextInput placeholder="Price" size="medium" v-model="price" @input="onPriceInput"/>
    <SButton label="Create" size="normal" theme="secondary" flat/>
  </div>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator";
import { ModalWrapper } from "@/components/_abstract/ModalWrapper.vue";
import { SButton } from "@/shared/components/Button";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";

@Component({
  name: 'CreateCourseModal',
  components: {
    STextInput,
    SButton
  }
})
export class CreateCourseModal extends ModalWrapper {

  public price = `200 000`

}
export default CreateCourseModal
</script>