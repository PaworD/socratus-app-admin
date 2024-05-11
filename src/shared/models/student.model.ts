import { Identifier, Pageable } from '@/shared/models/atom'

export interface IStudent {
    getName(): string
}

export interface StudentData extends Identifier {
    email: string
    firstName: string
    groups: number[]
    lastName: string
    phone: string
}

export type Student = StudentData & Partial<IStudent>

export type StudentUpdateIntention = Omit<StudentData, 'groups'>

export interface CreateStudentIntention {
    email: string | null
    firstName: string
    lastName: string
    phone: string
    groups?: number[]
}

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
