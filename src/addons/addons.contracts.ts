import { VueConstructor } from 'vue'

/**
 * List of available addons
 */
export enum Addons {
  Payments = 'payments',
  Statistics = 'statistics',
  Quizzes = 'quizzes'
}


/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export type Addon = VueConstructor