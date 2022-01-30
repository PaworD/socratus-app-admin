import { injectable } from 'inversify-props'

import { AbstractService } from '@/shared/abstract'

import { AnyObject, Id, Pageable } from '@/shared/models'
import { AttendanceDesk } from '@/shared/components'
import { decomposeModel } from '@/shared/helpers'

/**
 * Attendance Service
 *
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@injectable()
export class AttendanceService extends AbstractService<AttendanceDesk> {
  protected readonly url = '/attendances'

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
    return Promise.resolve('')
  }

  /**
   * Updates attendance
   *
   * @param id
   * @param payload
   */
  public async updateAttendance (id: Id, payload: Partial<AnyObject>): Promise<string | AttendanceDesk> {
    try {
      const response = await this.http.patch(this.url + `/${id}`, decomposeModel(payload))

      return response.data.message
    } catch (e) {
      throw new Error(e)
    }
  }
}