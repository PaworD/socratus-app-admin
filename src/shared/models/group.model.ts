import { Identifier } from "@/shared/models/atom";
import {Teacher} from "@/shared/models/teacher.model";
import {Course} from "@/shared/models/course.model";

export interface IGroup {
    getGroup(): string
}

export interface GroupData extends Identifier{
    name: string
    color: string
    course: Course | number
    teacher: Teacher | number
}

export type Group = Partial<GroupData & IGroup>