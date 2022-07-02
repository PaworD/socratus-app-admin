import { Action, Module, VuexModule } from 'vuex-module-decorators'
import { Inject } from 'inversify-props'

import { ToastService, ToastType, TYPES } from '@/services'
import { AnyObject, Id } from '@/shared/models'

import { ADDON_TYPES, PaymentsService } from '../services'

@Module
export class PaymentsModule extends VuexModule {
  @Inject(ADDON_TYPES.PaymentsServiceType)
  public paymentsService!: PaymentsService

  @Inject(TYPES.ToastServiceType)
  public toastService!: ToastService

  /**
   * Updates payment with passed in payload
   */
  @Action({ rawError: true })
  public async updatePayment (payload: { id: Id, payload: AnyObject }): Promise<void> {
    try {
      const message = await this.paymentsService.update(payload.id, payload.payload)

      this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
    } catch (e) {
      this.toastService.show(true, String(e), ToastType.ERROR, 200)
    }
  }
}

/**
 * VuexModule
 */
export const paymentsModule = PaymentsModule