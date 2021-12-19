import { injectable } from 'inversify-props'

import { AbstractService } from '@/shared/abstract'
import { AnyObject, CreateResourceIntention, Id, Pageable, Resource, Room } from '@/shared/models'
import { decomposeModel } from '@/shared/helpers'


@injectable()
export class ResourceService extends AbstractService<Resource> {

  protected url = '/resources'

  constructor () {
    super()
  }

  public async create (payload: CreateResourceIntention): Promise<string> {
    try {
      const _response = await this.http.post(this.url, decomposeModel(payload))

      return _response.data.message
    } catch (e) {
      throw new Error(e)
    }
  }

  public delete (id: Id): Promise<string> {
    return Promise.resolve('');
  }

  public async get (q?: AnyObject): Promise<{ results: Resource, meta: Pageable } | string | { results: Resource[], meta: Pageable }> {
    try {
      const _response = await this.http.get(this.url)

      return _response.data.data
    } catch (e) {
      throw new Error(e)
    }
  }

  public update (id: Id, payload: Partial<Resource>): Promise<string | Resource> {
    return Promise.resolve('');
  }

}