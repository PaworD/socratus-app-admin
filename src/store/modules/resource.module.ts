import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { ResourceService, ToastService, ToastType, TYPES } from '@/services'
import { CreateResourceIntention, Resource } from '@/shared/models'

@Module
export class ResourceModule extends VuexModule {

  @Inject(TYPES.ResourceServiceType)
  public resourceService!: ResourceService

  @Inject(TYPES.ToastServiceType)
  public toastService!: ToastService

  protected _resources: Resource[] = []

  @Action({rawError: true})
  public async fetchResources (): Promise<void> {
    try {
      const resources = await this.resourceService.get()
      this.context.commit('setResources', resources)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Action({ rawError: true })
  public async createResource (payload: CreateResourceIntention): Promise<void> {
    try {
     const message = await this.resourceService.create(payload)
      this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }

  @Mutation
  public setResources (resources: Resource[]): void {
    this._resources = resources
  }

  public get resources (): Resource[] {
    return this._resources
  }
}