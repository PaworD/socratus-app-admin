<template>
  <div class="rooms__modals__create">
    <div class="input-group">
      <label for="room-name">Write down name for the room</label>
      <STextInput size="medium" flat type="text" v-model="payload.name" id="room-name"
                  placeholder="Room name"/>
    </div>

    <div class="input-group">
      <label for="room-color">Define color for room</label>
      <ColorPicker :value.sync="payload.color" id="room-color" />
    </div>

    <SButton flat size="medium" :label=" isUpdateMode ? 'Update' : 'Create'" theme="secondary"
             :isLoading="isLoading"
             @onClick="onSubmitRoom" />
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'
import { SButton, STextInput } from '@/shared/components'
import { Action } from 'vuex-class'
import { Room } from '@/shared/models'
import ColorPicker from '@/components/ColorPicker.vue'

@Component<CreateRoomModal>({
  name: "CreateRoomModal",
  components: {
    STextInput,
    SButton,
    ColorPicker
  },

  mounted (): void {
    if (this.isUpdateMode) {
      this.payload = {
        name: this.modalData.room.name,
        color: this.modalData.room.color
      }
    }
  }
})
export class CreateRoomModal extends ModalWrapper {

  @Action
  public createRoom!: (payload: { name: string, color: string }) => Promise<void>

  @Action
  public updateRoom!: (payload: { room: { name: string, color: string }; id: number }) => Promise<void>

  public isLoading = false

  /**
   * Payload of room
   */
  public payload: { name: string, color: string } = {
    name: '',
    color: ''
  }

  public onSubmitRoom () {
    this.isLoading = true
    if (this.isUpdateMode) {
      this.updateRoom({room: this.payload, id: this.modalData.id}).then(() => {
        this.isLoading = false
        this.closeModal(null)
      })
    } else {
      this.createRoom(this.payload).finally(() => {
        this.isLoading = false
        this.closeModal(null)
      })
    }
  }

}
export default CreateRoomModal
</script>