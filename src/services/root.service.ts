import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import {Admin, AnyObject, Identifier, School} from "@/shared/models";
import {composeModel, hasResponseFailed, resolveWithError, snakeToCamel} from "@/shared/helpers";

@injectable()
export class RootService extends AbstractService<School> {

    constructor() {
        super();
    }

    protected readonly url ='/tenants'

    async create(payload: School): Promise<School | string> {
        return Promise.resolve({});
    }

    async delete(id: Identifier): Promise<string> {
        return Promise.resolve("");
    }

    async get(): Promise<School | string> {
        try {
            const _response = await this.http.get(this.url + '/schools/')

            return _response.data
        } catch (e: any) {
            throw resolveWithError(e.response)
        }
    }

    async signIn(payload: AnyObject): Promise<Admin> {
        try {
            const _response = await this.http.post('/accounts/login', {
                phone: payload.phone,
                password: payload.password,
                tenant: payload.tenant
            })

            return composeModel<Admin>(_response.data.data.me)
        } catch (e: any) {
            throw resolveWithError(e.response)
        }
    }

    async update(payload: Partial<School>): Promise<School> {
        return Promise.resolve({});
    }

}