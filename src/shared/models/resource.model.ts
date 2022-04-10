import { Identifier } from '@/shared/models/atom'

export interface ResourceData extends Identifier {
  name: string
}

export interface IResource {
  getName(): string
}

export type ResourceModel = ResourceData & IResource

export interface CreateResourceIntention extends Omit<ResourceData, 'id'> {
  name: string
}

export class Resource implements ResourceModel {

  public id: number
  public name: string

  constructor (id: number, name: string) {
    this.id = id
    this.name = name
  }

  public getName (): string {
    return this.name
  }
}