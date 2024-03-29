<template>
  <div class="payments">
    <div class="payments__controllers">
      <div class="payments__controllers__groups">
        <SDropdown theme="default" :list="groupsOptions"
                   value="Select Group" @on-select="selectGroup" />
      </div>
      <div class="payments__controllers__date">
        <Datepicker input-class="Input__input --medium --flat" v-model="date"
                    format="MMMM, yyyy" id="monthAndYear" placeholder="Select month and year" />
      </div>
    </div>
    <PaymentsTable v-if="isSetGroup" :list="paymentsRows" @onPay="getPayments" withActions/>
    <p v-else> Please select a group</p>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator'
import Datepicker from 'vuejs-datepicker'

import { DropdownItemProps, SDropdown } from '@/shared/components'
import { PaymentsTable } from './partials/PaymentsTable.vue'
import { Action, Getter } from 'vuex-class'
import { AnyObject, Group, Pageable, Payment } from '@/shared/models'
import { TableRowItem } from '@/shared/components/Table/_'

/**
 *
 * **ADDON**
 * ---
 *
 * View for **Payments**
 *
 * @summary This addon helps to manage income/outcome of agency
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<PaymentsAddonView>({
  name: 'PaymentsAddonView',
  components: {
    Datepicker,
    SDropdown,
    PaymentsTable
  },

  mounted (): void {
    this.fetchGroups()

    if (this.isSetGroup) {
      this.getPayments()
    }
  }
})
export class PaymentsAddonView extends Vue{

  @Action
  private fetchGroups!: (query?: AnyObject) => Promise<Pageable>

  @Action
  private getGroupPayments!: (query: AnyObject) => Promise<Payment[]>

  @Getter
  public groups!: Group[]

  public date = Date.now()

  public payments: Payment[] = []

  /**
   * Query parameters of view
   */
  public get queryParams (): AnyObject {
    return this.$route.query
  }

  public set queryParams (query: AnyObject) {
    this.$router.push({
      name: 'AddonView',
      query: { ...query }
    })
  }

  public get paymentsRows (): TableRowItem[] {
    return this.payments.map((payment) => {
      return {
        "Id": payment.id,
        "First Name": payment.student.firstName,
        "Last Name": payment.student.lastName,
        "Status": payment.amount === null ? 'pending' : 'payed',
        "Month / Year": `${payment.month}/${payment.year}`
      }
    })
  }

  /**
   * Determines whether group is present in query params
   */
  public get isSetGroup (): boolean {
    return typeof this.queryParams.group !== 'undefined'
  }

  /**
   * Determines whether interval has been set in query params
   */
  public get isIntervalSet (): boolean {
    return typeof this.queryParams.month !== 'undefined' && typeof this.queryParams.year !== 'undefined'
  }

  /**
   * List of groups
   */
  public get groupsOptions (): DropdownItemProps[] {
    return [...this.groups.map((group: Group) => {
      return {
        label: group.name,
        value: String(group.id)
      }
    })]
  }

  public selectGroup (group: DropdownItemProps): void {
    this.queryParams = {
      ...this.queryParams,
      group: group.value,
      month: new Date(this.date).getMonth() + 1,
      year: new Date(this.date).getFullYear()
    }
  }

  public getPayments (): void {
    this.getGroupPayments(this.queryParams).then((payments: Payment[]) => {
      this.payments = payments
    })
  }

  @Watch('date')
  protected onDateChanged (date: number):void {
    this.queryParams = {
      ...this.queryParams,
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear()
    }
  }


  @Watch('queryParams')
  protected onQueryChange (query: AnyObject):void {
    this.getGroupPayments(query).then((payments: Payment[]) => {
      this.payments = payments
    })
  }
}
export default PaymentsAddonView
</script>