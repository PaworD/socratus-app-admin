<template>
  <div>
    <SDropdown :value="list[0].label" :list="list" @on-select="select" multiselect />
    <code>
      {{ selectedItems }}
    </code>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import { DropdownItemProps, SDropdown } from '@/shared/components'

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
    SDropdown
  }
})
export class PaymentsAddonView extends Vue{

  public selectedItems: string[] = []

  public select (val: DropdownItemProps): void {
    if (!val.value) {
      return
    }
    this.selectedItems.push(val.value)
  }

  public get list (): DropdownItemProps[] {
    return [
      {
        label: 'First value',
        value: 'first-value'
      },
      {
        label: 'Second value',
        value: 'second-value'
      }
    ]
  }
}
export default PaymentsAddonView
</script>