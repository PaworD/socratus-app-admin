<template>
  <div class="rooms__modals__create">
    <div class="input-group">
      <label for="room-name">Write down name for the resource</label>
      <STextInput size="medium" flat type="text" v-model="payload.name" id="room-name"
                  placeholder="Resource name"/>
    </div>

    <SButton flat size="medium" :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary"
             :isLoading="isLoading"
             @onClick="onSubmit" />
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'

import { SButton, STextInput } from '@/shared/components'

@Component<CreateResourceModal>({
  name: "CreateResourceModal",
  components: {
    STextInput,
    SButton
  },
  mounted (): void {
    if (this.isUpdateMode) {
      this.payload = {
        name: this.modalData.room.name
      }
    }
  }
})
export class CreateResourceModal extends ModalWrapper {
  @Action
  public createResource!: (payload: { name: string }) => Promise<void>

  @Action
  public updateResource!: (id: number, payload: { name: string }) => Promise<void>

  /**
   * Determines the state of loading.
   */
  public isLoading = false

  /**
   * Payload of resource.
   */
  public payload: { name: string } = {
    name: ''
  }

  /**
   * Submits the form.
   */
  public onSubmit (): void {
    if (!this.payload.name || !this.payload.name.length) {
      return
    }

    this.isLoading = true
    if (this.isUpdateMode) {
      this.updateResource(this.modalData.id, { name: this.payload.name }).then(() => {
        this.closeModal(null)
      }).finally(() => {
        this.isLoading = false
      })
    } else {
      this.createResource(this.payload).finally(() => {
        this.closeModal(null)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }

}
export default CreateResourceModal
</script>