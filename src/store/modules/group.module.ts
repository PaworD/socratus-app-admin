import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {Inject} from "inversify-props";

import { GroupService, ToastService, ToastType } from "@/services";
import { Group } from "@/shared/models";

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
            await this.groupService.create(group)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action
    public async fetchGroups(): Promise<void> {
        try {
            const groups = await this.groupService.get()
            console.log(groups)
            this.context.commit('setGroups', groups)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Mutation
    public setGroups (groups: Group[]): void {
        this._groups = groups
    }

    public get groups(): Group[] {
        return this._groups.map((group) => {
            return {
                ...group
            }
        })
    }

}