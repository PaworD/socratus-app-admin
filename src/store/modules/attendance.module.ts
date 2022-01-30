import { Action, Module, VuexModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { AttendanceService, ToastService, ToastType, TYPES } from '@/services'
import { AnyObject } from '@/shared/models'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Module
export class AttendanceModule extends VuexModule {

  /**
   * Toast service
   */
  @Inject(TYPES.ToastServiceType)
  public readonly toastService!: ToastService

  /**
   * Attendance service
   */
  @Inject(TYPES.AttendanceServiceType)
  public readonly attendanceService!: AttendanceService

  /**
   * Updates attendance
   *
   * @param payload
   */
  @Action
  public async updateAttendance (payload: AnyObject): Promise<void> {
    try {
      const message = await this.attendanceService.updateAttendance(payload.id, payload.data)

      this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, e, ToastType.ERROR, 200)
    }
  }
}