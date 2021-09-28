import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import { StudentService } from "@/services";
import { Student } from "@/shared/models";

@Module
export class AdminModule extends VuexModule {

    @Inject()
    private studentService!: StudentService

    public _students: Student[] = []

    @Action
    public async fetchStudents(): Promise<void> {
        try {
            const students = await this.studentService.get()
            console.log(students)
            this.context.commit('setStudent', students)
        } catch (e) {
            throw new Error(e)
        }
    }

    @Mutation
    public setStudent (students: Student[]): void {
        this._students = students
    }

    public get students(): Student[] {
        return this._students
    }

}