export interface ScheduleIntention {
  startDate: string | Date | null
  endDate: string | Date | null
  roomId: string,
  days: {
    Mon: {
      startTime: string
      endTime: string
    },
    Tue: {
      startTime: string
      endTime: string
    },
    Wed: {
      startTime: string
      endTime: string
    },
    Thu: {
      startTime: string
      endTime: string
    },
    Fri: {
      startTime: string
      endTime: string
    },
    Sat: {
      startTime: string
      endTime: string
    },
    Sun: {
      startTime: string
      endTime: string
    }
  }
}