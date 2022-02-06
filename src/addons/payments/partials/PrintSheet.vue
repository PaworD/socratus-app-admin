<template>
  <div class="printable">
    <!-- Organization -->
    <div class="printable__organization">
      {{ payment }}
      <div>
        <VueQRCodeComponent class="qr-code" text="Text to encode"></VueQRCodeComponent>
      </div>
    </div>
    <!-- END | Organization -->

    <!-- Printable Content -->
    <div class="printable__content">
      <div class="leading">
        <h2> Confirmation of Transaction </h2>
        <p>  for: 02/2022 (October, 2022)  </p>
      </div>

      <h4> Khalimjonov Javlon </h4>

      <div class="info-box">
        <span>Overall payment amount: 400 000 UZS</span>
        <span>Group: IELTS-Intensive [10021]</span>
        <span>Instructor: John Doe</span>
        <span>Attendance feedback: 9/13 </span>
      </div>
    </div>
    <!-- END | Printable Content -->

    <!-- Printable footer -->
    <div class="printable__footer">
      <div>
        <p>Sign & Stamp <br> of education center</p>
      </div>
      <div>
        <p>Issued on: 02/02/2022</p>
      </div>
    </div>
    <!-- END | Printable footer -->
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import VueQRCodeComponent from 'vue-qrcode-component'
import { AnyObject } from '@/shared/models'
/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component({
  name: 'PrintSheet',
  components: {
    VueQRCodeComponent
  }
})
export class PrintSheet extends Vue {
  /**
   * FIXME: Change type of `payment`
   */
  @Prop({ type: Object, required: true })
  public readonly payment!: AnyObject
}
export default PrintSheet
</script>