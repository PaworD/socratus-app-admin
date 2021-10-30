import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import {CourseService, ToastService, ToastType} from "@/services";
import {Course, CourseData, Identifier} from "@/shared/models";

@Module
export class CourseModule extends VuexModule {

    @Inject()
    private courseService!: CourseService

    @Inject()
    private toastService!: ToastService

    public _courses: Course[] = []

    @Action
    public async fetchCourses(): Promise<void> {
        try {
            const courses = await this.courseService.get()
            console.log(courses)
            this.context.commit('setCourses', courses)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async createCourse(payload: Course): Promise<void> {
        try {
            const createdCourse = await this.courseService.create(payload)
            this.toastService.show(true, String(createdCourse), ToastType.SUCCESS, 100000)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async deleteCourse(id: Identifier): Promise<void> {
        try {
            const deleteCourse = await this.courseService.delete(id)
            console.log(deleteCourse)
            this.toastService.show(true, deleteCourse, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Mutation
    public setCourses (courses: Course[]): void {
        this._courses = courses
    }

    public get courses(): Course[] {
        return this._courses
    }

}