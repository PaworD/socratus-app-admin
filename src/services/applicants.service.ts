import { AbstractService } from '@/shared/abstract'

import { AnyObject, Applicant, Id, Pageable } from '@/shared/models'
import { composeModel, decomposeModel } from '@/shared/helpers'
import { injectable } from 'inversify-props'

@injectable()
export class ApplicantsService extends AbstractService<Applicant> {
  protected url = '/applications'

  constructor () {
    super();
  }

  public create (payload: Applicant): Promise<string | Applicant> {
    return Promise.resolve('undefined');
  }

  public async delete (id: Id): Promise<string> {
    try {
      const response = await this.http.delete(this.url + `/${id}`)

      return response.data.message
    } catch (e) {
      return e.toString()
    }
  }

  public async get (query: AnyObject | undefined): Promise<{ results: Applicant; meta: Pageable } | { results: Applicant[]; meta: Pageable } | string> {
    try {
      const _response = await this.http.get(this.url, { params: { ...query } })

      const meta: Pageable = {
        totalCount: _response.data.data.total_count,
        previous: _response.data.data.previous,
        next: _response.data.data.next
      }

      return {
        results: composeModel<Applicant>(_response.data.data.results) as Applicant[],
        meta
      }

    } catch (e) {
      throw new Error(e)
    }
  }

  public update (id: Id, payload: Partial<Applicant>): Promise<string | Applicant> {
    return Promise.resolve('undefined');
  }

  public async getApplicant(id: Id): Promise<Applicant> {
    try {
      const _response = await this.http.get(this.url + `/${id}`)

      return composeModel<Applicant>(_response.data.data) as Applicant
    } catch (e) {
      throw new Error(e)
    }
  }
}