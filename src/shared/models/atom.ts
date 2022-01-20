import { Student } from '@/shared/models/student.model'
import { Teacher } from '@/shared/models/teacher.model'
import { Group } from '@/shared/models/group.model'
import { Course } from '@/shared/models/course.model'

export interface AnyObject {
    [key: string]: any
}

export interface Identifier {
    id: number
}

export type Id = number

export enum Role {
    ADMIN = 1
}

export interface Image extends Identifier{
    alt: string
    url: string
}

export interface Pageable {
    next: number
    previous: number
    totalCount: number
    perPage?: number
}

export interface GlobalSearchResults {
    students: Student[],
    teachers: Teacher[],
    groups: Group[],
    courses: Course[]
}
