import { AbstractService } from "@/shared/abstract";
import { Identifier, Group} from "@/shared/models";
import {
    composeModel, decomposeModel,
    hasResponseFailed,
    resolveWithError
} from "@/shared/helpers";

export class GroupService extends AbstractService<Group> {
    protected url = '/groups'

    public async create(payload: Group): Promise<string | Group> {
        try {
            const _response = await this.http.post(this.url, decomposeModel(payload))

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return _response.data.data.message

        } catch (e) {
            throw new Error(e)
        }
    }

    public delete(id: Identifier): Promise<string> {
        return Promise.resolve("");
    }

    public async get(): Promise<Group[] | string | Group> {
        try {
            const _response = await this.http.get(this.url)

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return composeModel<Group>(_response.data.data) as Group[]
        } catch (e) {
            return e.toString()
        }
    }

    public update(id: Identifier, payload: Partial<Group>): Promise<string | Group> {
        return Promise.resolve('undefined');
    }
}