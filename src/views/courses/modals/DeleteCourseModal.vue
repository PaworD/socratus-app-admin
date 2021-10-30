<template>
  <div class="courses__modals courses__modals__create">
    <p>Are you sure to delete {{this.modalData.name}} from courses ?</p>
    <SButton label="OK" @onClick="removeCourse"/>
    <SButton label="Cancel" @onClick="() => this.closeModal(undefined)"/>
  </div>
</template>

<script lang="ts">

import { Component } from "vue-property-decorator";
import { ModalWrapper } from "@/components/_abstract/ModalWrapper.vue";
import { SButton } from "@/shared/components/Button";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { Action } from "vuex-class";
import { Identifier} from "@/shared/models";
import { SDropdown } from "@/shared/components/Dropdown";

@Component({
  name: 'DeleteCourseModal',
  components: {
    STextInput,
    SDropdown,
    SButton
  },

  mounted(): void {
    //
  }
})
export class DeleteCourseModal extends ModalWrapper {

  @Action
  public deleteCourse!: (id: Identifier) => Promise<void>

  public async removeCourse (): Promise<void> {
    await this.deleteCourse(this.modalData.id)
    this.closeModal('OK')
  }

}
export default DeleteCourseModal
</script>