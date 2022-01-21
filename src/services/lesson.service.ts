import { AbstractService } from '@/shared/abstract'
import { Event } from '@/shared/components'
import { AnyObject, Id, Pageable } from '@/shared/models'
import { decomposeModel } from '@/shared/helpers'
import { injectable } from 'inversify-props'

@injectable()
export class LessonService extends AbstractService<Event> {
  protected readonly url = '/lessons'

  constructor () {
    super()
  }

  public create (payload: Event): Promise<string | Event> {
    return Promise.resolve('undefined');
  }

  public delete (id: Id): Promise<string> {
    return Promise.resolve('');
  }

  public get (query: AnyObject | undefined): Promise<{ results: Event; meta: Pageable } | { results: Event[]; meta: Pageable } | string> {
    return Promise.resolve('undefined');
  }

  public async update (id: Id, payload: Partial<AnyObject>): Promise<string | Event> {
    try {
      const response = await this.http.patch(this.url + `/${id}`, decomposeModel(payload))

      return response.data.message
    } catch (e) {
      throw new Error(e)
    }
  }

}