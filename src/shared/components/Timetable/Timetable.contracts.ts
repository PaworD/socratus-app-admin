export interface Hour {
    key: number
    value: number
}

export interface CourseSession {
    teacher: string
    courseName: string
    startTime: string
    endTime: string
}

export interface Timetable {
    room: string
    courseSessions: CourseSession[]
}