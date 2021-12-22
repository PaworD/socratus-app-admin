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
 * TODO
 */
export type Addon = VueConstructor