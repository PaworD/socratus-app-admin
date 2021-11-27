import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {Inject} from "inversify-props";

import { TeacherService, ToastService, ToastType, TYPES } from '@/services'
import { Teacher } from "@/shared/models";

@Module
export class TeacherModule extends VuexModule {

    @Inject(TYPES.TeacherServiceType)
    private teacherService!: TeacherService

    @Inject(TYPES.ToastServiceType)
    private toastService!: ToastService

    public _teachers: Teacher[] = []

    @Action
    public async fetchTeachers(): Promise<void> {
        try {
            const teachers = await this.teacherService.get()
            console.log(teachers)
            this.context.commit('setTeachers', teachers)
        } catch (e) {
            throw new Error(e)
        }
    }

    @Mutation
    public setTeachers (teachers: Teacher[]): void {
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