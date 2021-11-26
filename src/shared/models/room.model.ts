import { Identifier } from '@/shared/models/atom'

export interface RoomData extends Identifier{
  name: string
  color: string
  isEditing?: boolean
}

export interface IRoom {
  getName(): string
}


export type Room = Partial<IRoom> & RoomData