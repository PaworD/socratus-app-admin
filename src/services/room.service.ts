import { AbstractService } from "@/shared/abstract";
import { injectable } from "inversify-props";

import { Room } from "@/shared/models";
import {
  composeModel,
  decomposeModel,
  hasResponseFailed,
  resolveWithError
} from "@/shared/helpers";

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

  async get(): Promise<string | Room[]> {
    try {
      const response = await this.http.get(this.url)

      if (hasResponseFailed(response)) {
        resolveWithError(response)
      }

      return composeModel<Room>(response.data.data) as Room[]
    } catch (e) {
      return e.toString()
    }
  }

  async update(id: number ,payload: Partial<Room>): Promise<string | Room> {
    try {
      const response = await this.http.put(this.url + `/${id}`, decomposeModel(payload))
      return response.data
    } catch (e) {
      return e.toString()
    }
  }
}