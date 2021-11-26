import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {Inject} from "inversify-props";

import { GroupService, ToastService, ToastType } from "@/services";
import { Group, Student } from '@/shared/models'

@Module
export class GroupModule extends VuexModule {

    @Inject()
    private groupService!: GroupService

    @Inject()
    private toastService!: ToastService

    public _groups: Group[] = []

    @Action
    public async createGroup(group: Group): Promise<void> {
        try {
            const message = await this.groupService.create(group)
            this.toastService.show(true, message.toString(), ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async fetchGroups(): Promise<void> {
        try {
            const groups = await this.groupService.get()
            this.context.commit('setGroups', groups)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async deleteGroup(id: number): Promise<void> {
        try {
            const message = await this.groupService.delete(id)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async removeStudentFromGroup (data: { groupId: number, studentId: number }): Promise<void> {
        try {
            const message = await this.groupService.removeStudentFromGroup(data)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async addStudentsToGroup (payload: { groupId: number, studentIds: number[] }): Promise<void> {
        console.log(payload)
        try {
            const message = await this.groupService.addStudentsToGroup(payload)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Mutation
    public setGroups (groups: Group[]): void {
        this._groups = groups}

    public get groups(): Group[] {
        return this._groups.map((group) => {
            return {
                ...group
            }
        })
    }
}