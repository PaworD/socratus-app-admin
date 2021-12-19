import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { ApplicantsService, ToastService, ToastType, TYPES } from '@/services'
import { AnyObject, Applicant, Pageable } from '@/shared/models'

/**
 *
 * VuexModule which is responsible for actions of `ApplicantsService`
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Module
export class ApplicantsModule extends VuexModule {

  @Inject(TYPES.ApplicantsServiceType)
  public readonly applicantsService!: ApplicantsService

  @Inject(TYPES.ToastServiceType)
  public readonly toastService!: ToastService

  protected _applicants: Applicant[] = []

  /**
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   *
   * @param id
   */
  @Action
  public async deleteApplicant(id: number): Promise<void> {
    try {
      const deleteCourse = await this.applicantsService.delete(id)

      this.toastService.show(true, deleteCourse, ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  /**
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   *
   * @param id
   */
  @Action
  public async getApplicant(id: number): Promise<Applicant> {
    try {
      const applicant = await this.applicantsService.getApplicant(id)

      return applicant
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
      throw new Error(e)
    }
  }

  /**
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   */
  @Action({ rawError: true })
  public async fetchApplicants (query?: AnyObject): Promise<Pageable> {
    try {
      const response = await this.applicantsService.get(query) as { results: Applicant[]; meta: Pageable }

      this.context.commit('setApplicants', response.results)

      return response.meta
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
      throw new Error(e)
    }
  }

  /**
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   */
  @Mutation
  public setApplicants (applicants: Applicant[]): void {
    this._applicants = applicants
  }

  /**
   * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
   */
  public get applicants (): Applicant[] {
    return this._applicants
  }


}