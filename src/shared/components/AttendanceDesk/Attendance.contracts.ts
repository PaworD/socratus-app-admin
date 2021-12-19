export interface AttendanceDesk {
  students: Student[]
  dates: string[]
}

export enum AttendancePeriod {
  Daily = 'day',
  Weekly = 'week',
  Monthly = 'month'
}

export interface AttendanceTableHead {
  lead: string,
  date: string
}

export enum AttendanceState {
  DIDNT_EXIST,
  ATTENDED,
  NOT_ATTENDED
}

export interface Attendance {
  id: number
  date: string
  attended: AttendanceState
  absenceReason?: string
}

interface Student {
  id: number
  firstName: string
  lastName: string
  attendances: Attendance[]
}