<template>
  <div class="payments__modals__update">
    <form @submit.prevent="submit">
      <div class="input-group">
        <label for="course-price">Amount to be payed</label>
        <money class="input input--flat input--medium" placeholder="Price" v-model.lazy="payload.amount"
               id="course-price" v-bind="moneyMask" required />
        <small v-if="hasErrors">This field can not be blank or either have 0 UZS</small>
      </div>
      <div class="input-group">
        <SIconButton type="submit" theme="default"> Submit </SIconButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import { Money } from 'v-money'
import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'

import { SIconButton, STextInput } from '@/shared/components'
import { AnyObject } from '@/shared/models'
import { Action } from 'vuex-class'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.om>
 */
@Component({
  name: 'UpdatePaymentModal',
  components: {
    SIconButton,
    STextInput,
    Money
  }
})
export class UpdatePaymentModal extends ModalWrapper {

  @Action
  private updatePayment!:(payload: { id: number; payload: AnyObject }) => Promise<void>

  public payload: AnyObject = {}

  public hasErrors = false

  /**
   * Configuration for money input
   */
  public moneyMask = {
    precision: 0,
    decimal: ",",
    thousands: " ",
    prefix: "UZS ",
    masked: false
  }

  /**
   * Submits the form
   */
  public async submit (): Promise<void> {
    this.hasErrors = false
    if (typeof this.payload.amount === 'undefined' || this.payload.amount === 0) {
      this.hasErrors = true
      return
    }

    console.log(this.modalData)

    await this.updatePayment({id: this.modalData.id, payload: { ...this.payload }})
    this.closeModal(null)
  }
}
export default UpdatePaymentModal

</script>