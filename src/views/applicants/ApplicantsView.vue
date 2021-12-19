<template>
  <div class="applications">
    <div class="applications__lead">
      <h2>All Applications</h2>
    </div>
    <STable v-bind="{ rows }"
            :routeName="'ApplicantsView'"
            :isLoading="isLoading"
            :totalCount="totalCount"
            :paginate="true"
            class="applications__table"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { AnyObject, Applicant, applicantStatus, Pageable } from '@/shared/models'
import { STable } from '@/shared/components'

import { TableRowItem } from '@/shared/components/Table/_'
import ApplicantActions from '@/views/applicants/components/actions/ApplicantActions.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<ApplicantsView>({
  name: "ApplicantsView",
  components: {
    STable
  },

  mounted (): void {
    this.getApplicants(this.queryParams)
  }
})
export class ApplicantsView extends Vue {

  /**
   * `VuexModule`s action to fetch all applicants
   *
   * @param query AnyObject | undefined
   */
  @Action
  public fetchApplicants!: (query?: AnyObject) => Promise<Pageable>

  /**
   * `VuexModule`s getter to get all applicants
   */
  @Getter
  public applicants!: Applicant[]

  public totalCount = 0
  public isLoading = false

  /**
   * Rows of the table
   */
  public get rows (): TableRowItem[] {
    return [...this.applicants.map((applicant: Applicant) => {
      return {
        id: applicant.id,
        fullName: applicant.firstName + ' ' + applicant.lastName,
        status: applicantStatus[applicant.status],
        'created At': applicant.createdAt,
        actions: [
          {
            component: ApplicantActions
          }
        ]
      }
    })]
  }

  /**
   * Read query params of current route
   */
  public get queryParams (): AnyObject {
    return this.$route.query
  }

  public async getApplicants(query?: AnyObject): Promise<void> {
    this.isLoading = true
    this.fetchApplicants(query).then((meta: Pageable) => {
      this.totalCount = meta.totalCount
    }).finally(() => {
      this.isLoading = false
    })
  }


  @Watch('queryParams')
  onQueryParamsChanged (query: AnyObject): void {
    this.getApplicants(query)
  }
}
export default ApplicantsView
</script>