<template>
  <div class="printable_view">
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
        </div>

        <div class="info-box">
          <table>
            <tr>
              <th>Name and Last name</th>
              <th>Group</th>
              <th>Course</th>
              <th>Attendances</th>
              <th>Date of Payment</th>
              <th>Payed in (UZS)</th>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>IELTS Intensive Group II</td>
              <td>IELTS</td>
              <td>9 / 13</td>
              <td>22/02/22</td>
              <td>200 000 USZ</td>
            </tr>
          </table>
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
    <div class="printable__sidebar">
        <SIconButton @onClick="print">
          Print
        </SIconButton>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import VueQRCodeComponent from 'vue-qrcode-component'
import { AnyObject } from '@/shared/models'
import { SIconButton } from '@/shared/components'
/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component({
  name: 'PrintSheet',
  components: {
    VueQRCodeComponent,
    SIconButton
  }
})
export class PrintSheet extends Vue {
  /**
   * FIXME: Change type of `payment`
   */
  @Prop({ type: Object, required: true })
  public readonly payment!: AnyObject

  public print (): void {
    window.print()
  }
}
export default PrintSheet
</script>