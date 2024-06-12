<template>
  <div class="modal__delete_modal">
    <div class="modal__delete_modal__message">
      <p>{{ modalData.message }}</p>
      <span>
        This action can not be undone
      </span>
    </div>
    <div class="modal__delete_modal__actions">
      <SIconButton @onClick="cancelDeletion">
        <template v-slot:icon>
          <i class="bi-x"></i>
          Cancel
        </template>
      </SIconButton>
      <SIconButton theme="danger" @onClick="removeItem">
        <template v-slot:icon>
          <i class="bi-trash"></i>
          Delete
        </template>
      </SIconButton>
    </div>
  </div>
</template>

<script lang="ts">

import { Action } from 'vuex-class'
import { Component } from 'vue-property-decorator'
import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'

import { SIconButton } from '@/shared/components'
import { getModule } from 'vuex-module-decorators'

/**
 * This component is responsible for delete action in any modules
 */
@Component({
  name: 'DeleteModal',
  components: {
    SIconButton
  }
})
export class DeleteModal extends ModalWrapper {

  /**
   * Import all actions with `delete` prefix from modules
   */
  @Action
  public deleteApplicant!: (id: number) => Promise<void>

  @Action
  public deleteTeacher!: (id: number) => Promise<void>

  @Action
  public deleteRoom!: (id: number) => Promise<void>

  @Action
  private deleteGroup!: (id: number) => void

  @Action
  private deleteCourse!: (id: number) => void

  /**
   * Gets the type of module , to define in which module deletion should be done
   *
   * @protected
   */
  protected get getModule (): string {
    if (!this.modalData.module) {
      console.warn('[module] is not present')
    }
    return this.modalData.module
  }

  /**
   * Gets the id of item to delete
   * @protected
   */
  protected get getId (): number | string {
    if (!this.modalData.id) {
      console.warn('[id] is not present')
    }
    return this.modalData.id
  }

  /**
   * Removes item
   * -----
   * Notice!: Do not forget to register module here , if there is new one
   */
  public async removeItem (): Promise<void> {
    try {
      switch (this.getModule) {
        case 'applicant':
          await this.deleteApplicant(Number(this.getId))
          break
        case 'group':
          await this.deleteGroup(Number(this.getId))
          break
        case 'teacher':
          await this.deleteTeacher(Number(this.getId))
          break
        case 'room':
          await this.deleteRoom(Number(this.getId))
          break
        case 'course':
          await this.deleteCourse(Number(this.getId))
          break
      }

      this.closeModal(true)
    } catch (e) {
      this.closeModal(null)
    }
  }

  /**
   * Cancels deletion
   */
  public async cancelDeletion (): Promise<void> {
    this.closeModal(null)
  }


}
export default DeleteModal
</script>
