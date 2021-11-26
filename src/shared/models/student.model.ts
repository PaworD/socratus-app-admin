import { Identifier } from "@/shared/models/atom";

export interface IStudent {
    getName(): string
}

export interface StudentData extends Identifier{
    email: string
    firstName: string
    groups: number[]
    lastName: string
    phone: string
}

export type Student = Partial<StudentData & IStudent>

export type StudentUpdateIntention = Omit<StudentData, 'groups'>

export interface ISchool {
    getName(): string
}

export interface SchoolData extends Identifier{
    address: string
    logo: string
    name: string
    phone: string
    tenant: string
}

export type School = Partial<SchoolData & ISchool>