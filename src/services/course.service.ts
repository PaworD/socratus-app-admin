import { AbstractService } from "@/shared/abstract";
import { injectable } from "inversify-props";

import { Course, AnyObject, Pageable } from '@/shared/models'
import {
    composeModel,
    decomposeModel,
    hasResponseFailed,
    resolveWithError
} from "@/shared/helpers";

/**
 *
 * Course service
 *
 * @inheritDoc
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */

@injectable()
export class CourseService extends AbstractService<Course> {

    protected url = '/courses'

    constructor() {
        super();
    }

    async create(payload: Course): Promise<string | Course> {
        try {
            const response = await this.http.post(this.url, decomposeModel(payload))
            return response.data.message
        } catch (e) {
            throw new Error(e.response.data.message)
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const response = await this.http.delete(this.url + `/${id}`)
            return response.data.message
        } catch (e) {
            return e.toString()
        }
    }

    public async get(query?: AnyObject): Promise<{ results: Course[]; meta: Pageable } | string | { results: Course; meta: Pageable }> {
        try {
            const _response = await this.http.get(this.url, { params: {...query} })

            if (hasResponseFailed(_response)) {
                resolveWithError(_response)
            }

            const meta: Pageable = {
                totalCount: _response.data.data.total_count,
                previous: _response.data.data.previous,
                next: _response.data.data.next
            }

            return {
                results: composeModel<Course>(_response.data.data.results) as Course[],
                meta
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    async update(id: number, payload: Partial<Course>): Promise<string | Course> {
        try {
            const response = await this.http.put(this.url + `/${id}`, decomposeModel(payload))
            return response.data.message
        } catch (e) {
            return e.toString()
        }
    }
}
