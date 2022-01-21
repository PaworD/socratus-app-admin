import { Action, Module, VuexModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { LessonService, ToastService, ToastType, TYPES } from '@/services'
import { AnyObject } from '@/shared/models'

@Module
export class LessonModule extends VuexModule {

  @Inject(TYPES.ToastServiceType)
  public readonly toastService!: ToastService

  @Inject(TYPES.LessonServiceType)
  public readonly lessonService!: LessonService

  @Action({ rawError: true })
  public async updateLesson (payload: AnyObject): Promise<void> {
    try {
      const response = await this.lessonService.update(payload.id, payload.payload)

      this.toastService.show(true, String(response), ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }
}