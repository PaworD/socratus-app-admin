import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import { AddonData, Admin, AnyObject, GlobalSearchResults, Pageable, School, Student } from '@/shared/models'

import {
    LocalStorageService,
    ToastService,
    RootService,
    ToastType,
    TYPES
} from '@/services'
import { Organization } from '@/views/contracts'


@Module
export class RootModule extends VuexModule {

    @Inject(TYPES.RootServiceType)
    private rootService!: RootService

    @Inject(TYPES.StorageServiceType)
    private localStorageService!: LocalStorageService

    @Inject(TYPES.ToastServiceType)
    private toastService!: ToastService

    public _addons: AddonData[] = []
    public _organization: Organization = {} as Organization
    public _schools: School[] = []

    @Action({ rawError: true })
    public async init(): Promise<void> {
        try {
            const response = await this.rootService.init()
            this.context.commit('setAuth', true)
            this.context.commit('setOrganization', response)
            this.context.commit('setAddons', response.addons)
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
        }
    }

    @Action({ rawError: true })
    public async fetchSchoolSet(query?: AnyObject): Promise<void> {
        try {
            const schools = await this.rootService.get(query) as { results: School[]; meta: Pageable }
            console.log(schools)
            this.context.commit('setSchools', schools.results)
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
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
        }
    }

    @Action({ rawError: true })
    public async search (q: string): Promise<GlobalSearchResults> {
        try {
            const response = await this.rootService.search(q)

            return response
        } catch (e) {
            this.toastService.show(true, e, ToastType.ERROR, 200)
            throw new Error(e)
        }
    }

    @Action({ rawError: true })
    public logOut (): void {
        this.localStorageService.clearKeys()
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

    @Mutation
    public setOrganization (data: Organization): void {
        this._organization = data
    }

    @Mutation
    public setAddons (addons: AddonData[]): void {
        this._addons = addons
    }

    /**
     * Gets information about this organization (school)
     */
    public get organization(): Organization {
        return this._organization
    }

    /**
     * Gets the list of registered schools list
     */
    public get schools(): School[] {
        return this._schools
    }

    /**
     * Gets the collection of addons which are in this school
     */
    public get myAddons(): AddonData[] {
        return this._addons
    }

}