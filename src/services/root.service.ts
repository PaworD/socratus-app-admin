import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Admin, AnyObject, Identifier, School } from "@/shared/models";
import {composeModel, hasResponseFailed, resolveWithError} from "@/shared/helpers";
import {AxiosResponse} from "axios";

@injectable()
export class RootService extends AbstractService<School> {

    constructor() {
        super();
    }

    protected readonly url ='/'

    async create(payload: School): Promise<School | string> {
        return Promise.resolve({});
    }

    async delete(id: Identifier): Promise<string> {
        return Promise.resolve("");
    }

    async get(): Promise<School | string> {
        try {
            const _response = await this.http.get(this.url + 'schools')

            return _response.data
        } catch (e: any) {
            return e.toString()
        }
    }

    async init (): Promise<AnyObject | string> {
        try {
            const _response = await this.http.get('/admin/init')

            if(hasResponseFailed(_response)) {
                console.log('e')
                return resolveWithError(_response)
            }

            return _response.data.data
        } catch (e: any) {
            console.log(e)
            throw resolveWithError(e.response)
        }
    }

    async signIn(payload: AnyObject): Promise<{ admin: Admin; tokens: AnyObject, tenant: string }> {
        try {
            const _response = await this.http.post('login', {
                phone: payload.phone,
                password: payload.password,
                tenant: payload.tenant
            })

            console.log(_response.data.data.tenant)

            return  {
                admin: composeModel<Admin>(_response.data.data.me) as Admin,
                tokens: {
                    refresh: _response.data.data.refresh,
                    access: _response.data.data.access
                },
                tenant: _response.data.data.tenant
            }
        } catch (e: any) {
            throw resolveWithError(e.response)
        }
    }

    async update(payload: Partial<School>): Promise<School> {
        return Promise.resolve({});
    }

}