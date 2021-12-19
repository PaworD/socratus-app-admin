import {Identifier} from "@/shared/models/atom";

export interface ITeacher {
    getName(): string
}

export type TeacherUpdateIntention = TeacherData

export interface TeacherData extends Identifier{
    phone: string
    firstName: string
    lastName: string
    email: string
}

export type Teacher = Partial<ITeacher> & TeacherData