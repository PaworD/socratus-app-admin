import axios from "axios";
import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Student, Identifier } from "@/shared/models";
import { hasResponseFailed, resolveWithError } from "@/shared/helpers";

@injectable()
export class StudentService extends AbstractService<Student> {

    constructor() {
        super();
    }

     protected readonly url ='/tenants'

     async create(payload: Student): Promise<Student | string> {
         return Promise.resolve({});
     }

     async delete(id: Identifier): Promise<string> {
        return Promise.resolve("");
     }

     async get(): Promise<Student | string> {
        try {
            const _response = await this.http.get(this.url + '/schools/')

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return _response.data
        } catch (e) {
            return e
        }
     }

     async update(payload: Partial<Student>): Promise<Student> {
        return Promise.resolve({});
     }

}