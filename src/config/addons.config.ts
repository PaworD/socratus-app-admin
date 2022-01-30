import { Addon, Addons, PaymentsAddonView, StatisticsAddonView } from '@/addons'
/**
 * Main registry of available addons
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export const addonsRegistry: Record<Addons, Addon> = {
  [Addons.Payments]: PaymentsAddonView,
  [Addons.Statistics]: StatisticsAddonView,
  [Addons.Quizzes]: PaymentsAddonView
}