import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

import { Inject } from "inversify-props";

import {Admin, AnyObject, School} from "@/shared/models";
import {RootService} from "@/services/root.service";

@Module
export class RootModule extends VuexModule {

    @Inject()
    private rootService!: RootService

    public _schools: School[] = []

    private _signInError: string | null = null

    @Action
    public async fetchSchoolSet(): Promise<void> {
        try {
            const schools = await this.rootService.get()
            this.context.commit('setSchools', schools)
        } catch (e) {
            throw new Error(e)
        }
    }

    @Action
    public async signInWith(payload: AnyObject): Promise<Admin | void > {
        try {
            this.context.commit('setSignInError', null)
            const response = await this.rootService.signIn(payload)
            return response
        } catch (e) {
            this.context.commit('setSignInError', e)
        }
    }

    @Mutation
    public setSchools (students: School[]): void {
        this._schools = students
    }

    @Mutation
    public setSignInError (errorMessage: string): void {
        this._signInError = errorMessage
    }

    public get schools(): School[] {
        return this._schools
    }

    public get signInError(): string | null {
        if (this._signInError)
            return this._signInError
        return null
    }

}