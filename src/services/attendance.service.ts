import { injectable } from 'inversify-props'

import { AbstractService } from '@/shared/abstract'

import { AnyObject, Id, Pageable } from '@/shared/models'
import { AttendanceDesk } from '@/shared/components'

/**
 * Attendance Service
 *
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@injectable()
export class AttendanceService extends AbstractService<AttendanceDesk> {
  protected readonly url = '/attendance'

  constructor () {
    super()
  }

  public create (payload: AttendanceDesk): Promise<string | AttendanceDesk> {
    return Promise.resolve('undefined');
  }

  public delete (id: Id): Promise<string> {
    return Promise.resolve('');
  }

  public get (query: AnyObject | undefined): Promise<{ results: AttendanceDesk; meta: Pageable } | { results: AttendanceDesk[]; meta: Pageable } | string> {
    return Promise.resolve('undefined');
  }

  public update (id: Id, payload: Partial<AttendanceDesk>): Promise<string | AttendanceDesk> {
    return Promise.resolve('undefined');
  }
}