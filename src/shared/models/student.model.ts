export interface IStudent {
    getName(): string
}

export interface StudentData {
    name: string
    lastName: string
}

export type Student = Partial<StudentData & IStudent>