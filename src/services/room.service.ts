import { AbstractService } from "@/shared/abstract";
import { injectable } from "inversify-props";

import { AnyObject, Pageable, Room } from '@/shared/models'
import {
  composeModel,
  decomposeModel,
  hasResponseFailed,
  resolveWithError
} from "@/shared/helpers";
import { Timetable } from '@/shared/components/Timetable'

/**
 *
 * Room service
 *
 * @inheritDoc
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */

@injectable()
export class RoomService extends AbstractService<Room> {

  protected url = '/rooms'

  constructor() {
    super();
  }

  async create(payload: Room): Promise<string | Room> {
    try {
      const response = await this.http.post(this.url, decomposeModel(payload))
      return response.data.message
    } catch (e) {
      return e.toString()
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const response = await this.http.delete(this.url + `/${id}`)

      return response.data.message
    } catch (e) {
      return e.toString()
    }
  }

  async get(q?: AnyObject): Promise<string | { results: Room[], meta: Pageable }> {
    try {
      const _response = await this.http.get(this.url)

      if (hasResponseFailed(_response)) {
        resolveWithError(_response)
      }

      const meta: Pageable = {} as Pageable

      return {
        meta,
        results: composeModel<Room>(_response.data.data) as Room[]
      }
    } catch (e) {
      throw new Error(e.toString())
    }
  }

  async update(id: number ,payload: Partial<Room>): Promise<string | Room> {
    try {
      const response = await this.http.put(this.url + `/${id}`, decomposeModel(payload))
      return response.data.message
    } catch (e) {
      return e.toString()
    }
  }

  public async getScheduleForTimetable (date?: string): Promise<Timetable[] | Timetable> {
    try {
      const _response = await this.http.get(this.url + '/get_schedule', { params: { date } })

      return composeModel<Timetable>(_response.data.data) as Timetable[]
    } catch (e) {
      throw new Error(e)
    }
  }
}
