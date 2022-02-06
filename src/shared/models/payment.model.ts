import { Id } from '@/shared/models/atom'
import { Student } from './student.model'

export interface PaymentData {
  id: Id
  amount: number | null
  createdAt: string
  group: number
  month: number
  student: Student
  updatedAt: string
  year: number
}

export type Payment = PaymentData