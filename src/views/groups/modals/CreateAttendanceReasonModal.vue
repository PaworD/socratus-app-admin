<template>
  <div class="attendance__modals__absence-reason">
    <h5>Write down absence reason: </h5>

    <textarea v-model="reason" placeholder="Comment..." class="" />

    <SIconButton theme="default" @onClick="submit">
      Add comment
    </SIconButton>
  </div>
</template>

<script lang="ts">

import { Action } from 'vuex-class'
import { Component } from 'vue-property-decorator'

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'

import { SIconButton, STextInput } from '@/shared/components'
import { AnyObject } from '@/shared/models'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component({
  name: 'CreateAttendanceReasonModal',
  components: {
    STextInput,
    SIconButton
  }
})
export class CreateAttendanceReasonModal extends ModalWrapper {

  /**
   * Updates attendance by given payload
   */
  @Action
  public updateAttendance!: (payload: AnyObject) => Promise<void>

  /**
   * Id of attendance
   */
  public id = Number(this.modalData.id)

  /**
   * Absence reason
   */
  public reason = this.modalData.reason || ''

  /**
   * Submits the reason to selected attendance's absence
   */
  public async submit (): Promise<void> {
    try {
      await this.updateAttendance({ id: this.id , data: { absence_reason: this.reason.length > 0 ? this.reason : null }})
      this.closeModal(null)
    } catch (e) {
      console.log(e)
      this.closeModal(null)
    }
  }
}
export default CreateAttendanceReasonModal
</script>