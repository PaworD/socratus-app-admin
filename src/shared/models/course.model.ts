import { Identifier } from "@/shared/models/atom";

export interface ICourse {
    getCourseName(): string
}

export interface CourseData extends Identifier{
    name: string
    price: number
    priceCurrency: string
}

export type Course = Partial<ICourse & CourseData>