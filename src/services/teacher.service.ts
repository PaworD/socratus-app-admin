import {AbstractService} from "@/shared/abstract";

import {
    Teacher,
    Identifier, AnyObject, Pageable
} from '@/shared/models'
import {
    composeModel, decomposeModel,
    hasResponseFailed,
    resolveWithError, ValidationError
} from '@/shared/helpers'
import {injectable} from 'inversify-props'

@injectable()
export class TeacherService extends AbstractService<Teacher> {

    protected url = '/teachers'

    constructor() {
        super();
    }

    public async create(payload: Teacher): Promise<Teacher | string> {
        try {
            const _response = await this.http.post(this.url, decomposeModel(payload))
            if (hasResponseFailed(_response)) {
                console.log('Here')
                return resolveWithError(_response)
            }

            return _response.data.message
        } catch (e) {
            if (typeof e.response.data.message === 'string') {
                throw new Error(e.response.data.message)
            }

            throw new ValidationError(e)
        }
    }

    public async delete(id: number): Promise<string> {
        try {
            const response = await this.http.delete(this.url + `/${id}`)
            return response.data.message
        } catch (e) {
            throw new Error(e.toString())
        }
    }

    public async get(query?: AnyObject): Promise<{ results: Teacher[]; meta: Pageable } | string | {
        results: Teacher;
        meta: Pageable
    }> {
        try {
            const _response = await this.http.get(this.url, {params: {...query}})

            if (hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            const meta: Pageable = {
                totalCount: _response.data.data.total_count,
                previous: _response.data.data.previous,
                next: _response.data.data.next
            }

            return {
                results: composeModel<Teacher>(_response.data.data.results) as Teacher[],
                meta
            }
        } catch (e) {
            return e.toString()
        }
    }

    public update(id: number, payload: Partial<Teacher>): Promise<string | Teacher> {
        return Promise.resolve('undefined');
    }
}
