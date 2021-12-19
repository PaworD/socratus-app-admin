<template>
  <div class="applications">
    <div class="applications__application__head">
      <SIconButton borderless @onClick="() => { this.$router.go(-1) }">
        <template v-slot:icon>
          <i class="bi-arrow-left"></i>
        </template>
        Back to <strong>All Applications</strong>
      </SIconButton>
    </div>
    <div class="applications__application__body">
      <p>Information</p>

      <div class="form-group">
        Full name: {{ applicant.firstName }} {{ applicant.lastName }}
      </div>

      <div class="from-group">
        Form was created : {{ applicant.createdAt }}
      </div>

      <div class="from-group">
        Form was updated by admin at : {{ applicant.updatedAt }}
      </div>

      <div class="form-group">
        {{ applicant }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { Applicant, Id } from '@/shared/models'
import { SIconButton } from '@/shared/components'


/**
 * @author A
 */
@Component<ApplicantContentView>({
  name: 'ApplicantContentView',
  components: {
    SIconButton
  },

  mounted(): void {
    this.isLoading = true
    this.getApplicant(Number(this.$route.params.id)).then((applicant: Applicant) => {
      this.applicant = applicant
    }).finally(() => {
      this.isLoading = false
    })
  }
})
export class ApplicantContentView extends Vue {
  /**
   * `VuexModule`s action to fetch given applicant
   */
  @Action
  public readonly getApplicant!: (id: Id) => Promise<Applicant>

  /**
   * Current applicant
   */
  public applicant: Applicant = {} as Applicant

  /**
   * Loading state
   */
  public isLoading = false
}
export default ApplicantContentView
</script>