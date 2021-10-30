import {Identifier} from "@/shared/models/atom";

export interface ITeacher {
    getName(): string
}

export interface TeacherData extends Identifier{
    phone: string
    firstName: string
    lastName: string
}

export type Teacher = Partial<TeacherData & ITeacher>