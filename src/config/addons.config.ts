import { Addon, Addons, PaymentsAddonView } from '@/addons'
/**
 * Main registry of available configs
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const addonsRegistry: Record<Addons, Addon> = {
  [Addons.Payments]: PaymentsAddonView,
  [Addons.Statistics]: PaymentsAddonView,
  [Addons.Quizzes]: PaymentsAddonView
}