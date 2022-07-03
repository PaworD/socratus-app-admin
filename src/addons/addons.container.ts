import { container } from 'inversify-props'

import { ADDON_TYPES, PaymentsService } from '@/addons/payments/services'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
export const addonsContainersCollection = (): void =>  {
   container.bind<PaymentsService>(ADDON_TYPES.PaymentsServiceType).to(PaymentsService)
}
