import { AbstractService } from "@/shared/abstract";
import { Group} from "@/shared/models";
import {
    composeModel, decomposeModel,
    hasResponseFailed,
    resolveWithError
} from "@/shared/helpers";
import { injectable } from 'inversify-props'

@injectable()
export class GroupService extends AbstractService<Group> {
    protected url = '/groups'

    constructor() {
        super();
    }

    public async create(payload: Group): Promise<string | Group> {
        try {
            const _response = await this.http.post(this.url, decomposeModel(payload))

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return _response.data.message

        } catch (e) {
            throw new Error(e)
        }
    }

    public async delete(id: number): Promise<string> {
        try {
            const _response = await  this.http.delete(this.url + `/${id}`)

            return _response.data.message
        } catch (e) {
            throw new Error(e)
        }
    }

    public async get(): Promise<Group[] | string | Group> {
        try {
            const _response = await this.http.get(this.url)

            if(hasResponseFailed(_response)) {
                throw resolveWithError(_response)
            }

            console.log(composeModel<Group>(_response.data.data) as Group[])

            return composeModel<Group>(_response.data.data) as Group[]
        } catch (e) {
            throw new Error(e)
        }
    }

    public update(id: number, payload: Partial<Group>): Promise<string | Group> {
        return Promise.resolve('undefined');
    }

    public async removeStudentFromGroup (data: { groupId: number, studentId: number }): Promise<string> {
        try {
            const _response = await this.http.post(this.url + `/${data.groupId}/remove_student/${data.studentId}`)

            if(hasResponseFailed(_response)) {
                throw resolveWithError(_response)
            }

            return _response.data.message
        } catch (e) {
            throw new Error(e)
        }
    }

    public async addStudentsToGroup (payload: { groupId: number, studentIds: number[] }): Promise<string> {
        try {
            const _response = await this.http.post(this.url + `/${payload.groupId}/add_students`, { student_ids: payload.studentIds })

            if(hasResponseFailed(_response)) {
                throw resolveWithError(_response)
            }

            return _response.data.message
        } catch (e) {
            throw new Error(e)
        }
    }
}