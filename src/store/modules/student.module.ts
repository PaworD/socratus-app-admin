import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import { StudentService, ToastService, ToastType } from "@/services";
import { Id, Student, StudentUpdateIntention } from '@/shared/models'

@Module
export class StudentModule extends VuexModule {

    @Inject()
    private studentService!: StudentService

    @Inject()
    private toastService!: ToastService

    public _students: Student[] = []

    @Action
    public async createStudent(student: Student): Promise<void> {
        try {
            const message = await this.studentService.create(student)
            this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async updateStudent(payload: { student: StudentUpdateIntention, id: number }): Promise<void> {
        try {
            const message = await this.studentService.update(payload.id, payload.student)
            this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async fetchStudents(): Promise<void> {
        try {
            const students = await this.studentService.get()
            console.log(students)
            this.context.commit('setStudents', students)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async deleteStudent(id: Id): Promise<void> {
        try {
            const message = await this.studentService.delete(id)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Mutation
    public setStudents (students: Student[]): void {
        this._students = students
    }

    public get students(): Student[] {
        return this._students.map((student) => {
            return {
                ...student
            }
        })
    }

}