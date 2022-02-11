<template>
  <table class="payments__table">
    <thead>
    <tr>
      <th v-for="(column, index) in cols" :key="index">{{ column }}</th>
      <th v-if="hasActions">Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in list" :key="index">
      <td v-for="(column, indexColumn) in cols"
          :class="{ 'status': column === 'Status' }"
          :key="indexColumn">
        <span :class="[(item[column]) == 'pending' ? 'pending' : 'payed']">
          {{ item[column] }}
        </span>
      </td>
      <td v-if="hasActions" class="actions-row">
        <SIconButton theme="default" borderless @onClick="popupPrintModal(item)">
          <template v-slot:icon>
            <i class="bi-printer"></i>
          </template>
        </SIconButton>
        <SIconButton theme="default" borderless>
          <template v-slot:icon>
            <i class="bi-file-pdf"></i>
          </template>
        </SIconButton>
        <SIconButton theme="default" borderless>
          <template v-slot:icon>
            <i class="bi-pencil"></i>
          </template>
        </SIconButton>
        <SIconButton theme="default" borderless>
          <template v-slot:icon>
            <i class="bi-trash-fill"></i>
          </template>
        </SIconButton>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

import { SIconButton } from '@/shared/components'
import { AnyObject, Payment } from '@/shared/models'
import PrintModal from '@/addons/payments/modals/PrintModal.vue'
import { ModalSize } from '@/shared/abstract'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component<PaymentsTable>({
  name: 'PaymentsTable',
  components: {
    SIconButton
  }
})
export class PaymentsTable extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  private readonly withActions!: boolean

  @Prop({ type: Array, required: true })
  public readonly list!: AnyObject[]

  @Prop({ type: Array, required: false, default: null })
  public readonly columns!: AnyObject[]

  public readonly defaultColumns = [ 'First Name', 'Last Name', 'Status']

  public get cols (): string[] {
    if(this.list.length == 0) {
      return []
    }
    return Object.keys(this.list[0])
  }

  public get hasActions (): boolean {
    return this.withActions
  }

  /**
   * Opens Print Dialog
   */
  public popupPrintModal (item: Payment): void {
    this.$modalService.open(PrintModal, {
      payment: item
    }, {
      hasHeader: true,
      headerText: '',
      size: ModalSize.FullScreen,
      persistent: true
    })
  }
}
export default PaymentsTable
</script>