import { AbstractService } from "@/shared/abstract";

import {
    Teacher,
    Identifier
} from "@/shared/models";
import {
    composeModel,
    hasResponseFailed,
    resolveWithError
} from "@/shared/helpers";

export class TeacherService extends AbstractService<Teacher> {

    protected url = '/teachers'

    constructor() {
        super();
    }

    public create(payload: Teacher): Promise<string | Teacher> {
        return Promise.resolve('undefined');
    }

    public delete(id: number): Promise<string> {
        return Promise.resolve("");
    }

    public async get(): Promise<Teacher[] | string | Teacher> {
        try {
            const _response = await this.http.get(this.url)

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return composeModel<Teacher>(_response.data.data) as Teacher[]
        } catch (e) {
            return e.toString()
        }
    }

    public update(id: number, payload: Partial<Teacher>): Promise<string | Teacher> {
        return Promise.resolve('undefined');
    }
}