import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Admin, AnyObject, GlobalSearchResults, Pageable, School } from '@/shared/models'
import { composeModel, obsKeysToString, resolveWithError } from '@/shared/helpers'

@injectable()
export class RootService extends AbstractService<School> {

    constructor() {
        super();
    }

    protected readonly url ='/'

    async create(payload: School): Promise<School | string> {
        return Promise.resolve({});
    }

    async delete(id: number): Promise<string> {
        return Promise.resolve("");
    }

    async get(q?: AnyObject): Promise<{ results: School[], meta: Pageable } | string | { results: School, meta: Pageable }> {
        try {
            const _response = await this.http.get(this.url + 'schools')

            const meta: Pageable = {} as Pageable

            return {
                meta: meta,
                results: composeModel<School>(_response.data) as School[]
            }
        } catch (e: any) {
            return e.toString()
        }
    }

    async init (): Promise<AnyObject> {
        try {
            const _response = await this.http.get('/admin/init')

            return  composeModel<AnyObject>(_response.data.data)
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
                tenant: payload.tenant,
                // TODO: Make enum of apps , then reference with it
                app: 'admin'
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
        } catch (e) {
            if ((e as AnyResponse).response) {
                if (typeof e.response.data.message !== 'string') {
                    const message = obsKeysToString(e.response.data.message, ['tenant', 'email', 'password'])
                    throw message
                } else {
                    throw new Error(e.response.data.message)
                }
            }

            throw new Error(e)
        }
    }

    public async search (q: string): Promise<GlobalSearchResults> {
        try {
            const response = await this.http.get(this.url + 'search', { params: { q } })
            console.log(response.data)

            return composeModel<GlobalSearchResults>(response.data.data) as GlobalSearchResults
        } catch (e) {
            throw new Error(e)
        }
    }

    async update(id: number, payload: Partial<School>): Promise<School> {
        return Promise.resolve({});
    }

}
export type AnyResponse = { response: AnyObject }