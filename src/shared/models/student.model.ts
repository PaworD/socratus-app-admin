import {Identifier} from "@/shared/models/atom";

export interface IStudent {
    getName(): string
}

export interface StudentData {
    name: string
    lastName: string
}

export type Student = Partial<StudentData & IStudent>

export interface ISchool {
    getName(): string
}

export interface SchoolData extends Identifier{
    address: string
    logo: string
    name: string
    phone: string

}

export type School = Partial<SchoolData & ISchool>