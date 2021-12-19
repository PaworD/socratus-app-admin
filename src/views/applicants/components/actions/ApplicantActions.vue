<template>
  <div>
    <SIconButton borderless @onClick="showApplicant">
      <template v-slot:icon>
        <i class="bi-eye"></i>
      </template>
    </SIconButton>
    <SIconButton borderless @onClick="deleteApplicant">
      <template v-slot:icon>
        <i class="bi-trash"></i>
      </template>
    </SIconButton>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

import { TableRowItem } from '@/shared/components/Table/_'
import { SIconButton } from '@/shared/components'

import { AnyObject } from '@/shared/models'
import { DeleteModal } from '@/shared/modals'
import { ModalSize } from '@/shared/abstract'

/**
 * @author Javlon Khalimjanov <khalimjanov2000@gmail.com>
 */
@Component({
  name: 'ApplicantActions',
  components: {
    SIconButton
  }
})
export class ApplicantActions extends Vue {
  @Prop({type: Object, required: true})
  public readonly row!: TableRowItem

  @Prop({type: Object, required: false})
  public readonly actions!: AnyObject


  public showApplicant (): void {
    this.$router.push(`/applicants/${this.row.id}`)
  }

  public deleteApplicant (): void {
    this.$modalService.open(DeleteModal,
        {
          id: this.row.id,
          module: 'applicant',
          message: `Are you sure to delete applicant: ${this.row.id} `
        },
        {
          hasHeader: true,
          size: ModalSize.ExtraSmall,
          persistent: false
        })
  }
}
export default ApplicantActions
</script>