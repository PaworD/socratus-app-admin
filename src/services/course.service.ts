import { AbstractService } from "@/shared/abstract";
import { injectable } from "inversify-props";

import {Identifier, Course, AnyObject} from "@/shared/models";
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

    async create(payload: Course): Promise<string | Course> {
        try {
            const response = await this.http.post(this.url, decomposeModel(payload))
            return response.data.message
        } catch (e) {
            return e.toString()
        }
    }

    async delete(id: Identifier): Promise<string> {
        try {
            const response = await this.http.delete(this.url + `/${id}`)
            console.log(response.data)
            return response.data.message
        } catch (e) {
            return e.toString()
        }
    }

    async get(): Promise<string | Course[]> {
        try {
            const response = await this.http.get(this.url)

            if (hasResponseFailed(response)) {
                resolveWithError(response)
            }

            return composeModel<Course>(response.data.data) as Course[]
        } catch (e) {
            return e.toString()
        }
    }

    async update(id: Identifier ,payload: Partial<Course>): Promise<string | Course> {
        try {
            const response = await this.http.put(this.url + `/${id}`, decomposeModel(payload))
            return response.data
        } catch (e) {
            return e.toString()
        }
    }
}