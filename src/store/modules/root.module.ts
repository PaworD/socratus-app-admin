import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";

import {Inject} from "inversify-props";

import {Admin, AnyObject, School} from "@/shared/models";
import {RootService} from "@/services/root.service";
import {LocalStorageService} from "@/services/storage.service";
import {ToastService, ToastType} from "@/services/toast.service";

@Module
export class RootModule extends VuexModule {

    @Inject()
    private rootService!: RootService

    @Inject()
    private localStorageService!: LocalStorageService

    @Inject()
    private toastService!: ToastService

    public _schools: School[] = []

    @Action({ rawError: true })
    public async init(): Promise<void> {
        try {
            await this.rootService.init()
            this.context.commit('setAuth', true)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action({ rawError: true })
    public async fetchSchoolSet(): Promise<void> {
        try {
            const schools = await this.rootService.get()
            this.context.commit('setSchools', schools)
        } catch (e) {
            throw new Error(e)
        }
    }

    @Action({ rawError: true })
    public async signInWith(payload: AnyObject): Promise<Admin> {
        try {
            const response = await this.rootService.signIn(payload)
            // Set auth state
            this.context.commit('setAuth', true)
            // Save tokens
            this.localStorageService.setItem('refresh', response.tokens.refresh)
            this.localStorageService.setItem('access', response.tokens.access)
            this.localStorageService.setItem('tenant', response.tenant)

            return response.admin
        } catch (e) {
            console.log(e)
            this.toastService.show(true, e, ToastType.ERROR, 200)
            return {}
        }
    }

    @Mutation
    public setSchools (schools: School[]): void {
        this._schools = schools.map((school) => {
            return {
                ...school,
                tenant: `${school.name}_${school.id}`
            }
        })
    }

    public get schools(): School[] {
        return this._schools
    }

}