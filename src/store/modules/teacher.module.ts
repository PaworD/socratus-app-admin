import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {Inject} from "inversify-props";

import {TeacherService, ToastService, ToastType, TYPES} from '@/services'
import {AnyObject, Pageable, Teacher} from '@/shared/models'
import {ValidationError} from "@/shared/helpers";

@Module
export class TeacherModule extends VuexModule {
    @Inject(TYPES.TeacherServiceType)
    private teacherService!: TeacherService

    @Inject(TYPES.ToastServiceType)
    private toastService!: ToastService

    public _teachers: Teacher[] = []

    @Action({ rawError: true })
    public async createTeacher(teacher: Teacher): Promise<void> {
        try {
            const message = await this.teacherService.create(teacher)
            this.toastService.show(true, String(message), ToastType.SUCCESS, 200)
        } catch (e) {
            if (e instanceof ValidationError) {
                throw e
            } else {
                this.toastService.show(true, e, ToastType.ERROR, 200)
            }
        }
    }

    @Action
    public async deleteTeacher(id: number): Promise<void> {
        try {
            const message = await this.teacherService.delete(id)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action({rawError: true})
    public async fetchTeachers(query?: AnyObject): Promise<Pageable> {
        try {
            const teachers = await this.teacherService.get(query) as { results: Teacher[]; meta: Pageable }

            this.context.commit('setTeachers', teachers.results)

            return teachers.meta
        } catch (e) {
            throw new Error(e)
        }
    }

    @Mutation
    public setTeachers(teachers: Teacher[]): void {
        this._teachers = teachers
    }

    public get teachers(): Teacher[] {
        return this._teachers.map((teacher) => {
            return {
                ...teacher
            }
        })
    }

}
