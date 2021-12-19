import { Identifier } from "@/shared/models/atom";
import {Teacher} from "@/shared/models/teacher.model";
import {Course} from "@/shared/models/course.model";
import { Student } from '@/shared/models/student.model'

export interface IGroup {
    getGroup(): string
}

export type GroupUpdateIntention = Omit<GroupData, 'course' & 'students'>

export interface GroupData extends Identifier{
    name: string
    color: string
    course: Course | number
    teacher: Teacher | number
    students: Student[]
}

export type Group = GroupData & Partial<IGroup>