<template>
  <div class="modal__delete_modal">
    <div class="modal__delete_modal__message">
      <span>
        Are you sure you want to log out
      </span>
    </div>
    <div class="modal__delete_modal__actions">
      <SIconButton @onClick="cancelLogout">
        <template v-slot:icon>
          <i class="bi-x"></i>
          Cancel
        </template>
      </SIconButton>
      <SIconButton :theme="'danger'" @onClick="logout">
        <template v-slot:icon>
          <i class="bi-arrow-right-square"></i>
          Log out
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
@Component<LogoutModal>({
  name: 'LogoutModal',
  components: {
    SIconButton
  }
})
export class LogoutModal extends ModalWrapper {

  /**
   * Finishes the session for current user
   */
  @Action
  public logOut!: () => void

  /**
   * Cancels logging out
   */
  public async cancelLogout (): Promise<void> {
    this.closeModal(null)
  }

  /**
   * FIXME: How do you if it success or not
   */
  public logout (): void {
    this.logOut()
    this.closeModal({ success: true })
  }


}
export default LogoutModal
</script>