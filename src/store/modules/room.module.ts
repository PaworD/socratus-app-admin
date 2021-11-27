import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import { RoomService, ToastService, ToastType, TYPES } from '@/services'
import { Course, Room } from '@/shared/models'

@Module
export class RoomModule extends VuexModule {

  @Inject(TYPES.RoomServiceType)
  private roomService!: RoomService

  @Inject(TYPES.ToastServiceType)
  private toastService!: ToastService

  public _rooms: Room[] = []

  @Action
  public async fetchRooms(): Promise<void> {
    try {
      const rooms = await this.roomService.get()

      this.context.commit('setRooms', rooms)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Action
  public async createRoom(payload: Room): Promise<void> {
    try {
      const createdCourse = await this.roomService.create(payload)
      this.toastService.show(true, String(createdCourse), ToastType.SUCCESS, 100000)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Action
  public async updateRoom(payload: { room: { name: string, color: string }, id: number }): Promise<void> {
    try {
      const createdCourse = await this.roomService.update(payload.id, payload.room)
      this.toastService.show(true, String(createdCourse), ToastType.SUCCESS, 100000)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Action
  public async deleteRoom(id: number): Promise<void> {
    try {
      const deleteRoom = await this.roomService.delete(id)

      this.toastService.show(true, deleteRoom, ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Mutation
  public setRooms (rooms: Room[]): void {
    this._rooms = rooms
  }

  public get rooms(): Room[] {
    return this._rooms
  }

}