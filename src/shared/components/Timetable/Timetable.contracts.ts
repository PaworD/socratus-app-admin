import { Group, Identifier, Room } from '@/shared/models'

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

export interface Schedule extends Identifier{
    name: string
    startTime: string
    endTime: string
    group: Group

}

export interface Timetable {
    room: Room
    schedule: Schedule[]
}

export interface AnyTime {
    hours: number,
    minutes: number
}

export enum TimetableMode {
    EDIT = 'EDIT',
    PREVIEW = 'PREVIEW'
}