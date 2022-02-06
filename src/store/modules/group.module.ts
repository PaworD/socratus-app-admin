import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { Inject } from 'inversify-props'

import { GroupService, ToastService, ToastType, TYPES } from '@/services'
import { AnyObject, Group, Pageable, Payment, ScheduleIntention } from '@/shared/models'
import { AttendanceDesk, AttendanceInterval, Event } from '@/shared/components'

@Module
export class GroupModule extends VuexModule {

    @Inject(TYPES.GroupServiceType)
    private groupService!: GroupService

    @Inject(TYPES.ToastServiceType)
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
    public async fetchGroups(query?: AnyObject): Promise<void> {
        try {
            const groups = await this.groupService.get(query) as { results: Group[], meta: Pageable }
            this.context.commit('setGroups', groups.results)
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
    public async updateGroup(payload: { group: Group, id: number }): Promise<void> {
        try {
            const updatedGroup = await this.groupService.update(payload.id, payload.group)
            this.toastService.show(true, String(updatedGroup), ToastType.SUCCESS, 200)
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
        try {
            const message = await this.groupService.addStudentsToGroup(payload)
            this.toastService.show(true, message, ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async getGroupAttendance (payload: { id: number, interval: AttendanceInterval }): Promise<AttendanceDesk> {
        try {
            const attendanceDesk = await this.groupService.getGroupAttendance(payload.id, payload.interval)

            return attendanceDesk
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
        }
    }

    @Action
    public async createGroupSchedule (payload: {id: number; schedule: ScheduleIntention}): Promise<void> {
        try {
            const response = await this.groupService.createGroupSchedule(payload)

            this.toastService.show(true, String(response), ToastType.SUCCESS, 200)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
        }
    }

    @Action
    public async getGroupSchedule (query: { group: number, month?: number, year?: number }): Promise<Event[]> {
        try {
            return await this.groupService.getGroupSchedule(query)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
        }
    }

    @Action
    public async getGroupPayments (query: AnyObject): Promise<Payment[]> {
        try {
            return await this.groupService.getGroupPayments(query)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
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