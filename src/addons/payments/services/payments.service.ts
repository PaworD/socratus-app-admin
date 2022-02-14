import { injectable } from 'inversify-props'

import { AbstractService } from '@/shared/abstract'
import { AnyObject, Id, Pageable, Payment } from '@/shared/models'

/**
 * Payments service
 *
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@injectable()
export class PaymentsService extends AbstractService<Payment> {
  protected url = '/payments'

  constructor() {
    super();
  }

  public create (payload: Payment): Promise<string | Payment> {
    return Promise.resolve('undefined');
  }

  public delete (id: Id): Promise<string> {
    return Promise.resolve('');
  }

  public get (query: AnyObject | undefined): Promise<{ results: Payment; meta: Pageable } | { results: Payment[]; meta: Pageable } | string> {
    return Promise.resolve('undefined');
  }

  public async update (id: Id, payload: AnyObject): Promise<string | Payment> {
    try {
      const response = await this.http.patch(this.url + `/${id}`, { ...payload })

      return response.data.message
    } catch (e) {
      throw new Error(e)
    }
  }

}