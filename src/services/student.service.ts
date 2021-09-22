import axios from "axios";
import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Student, Identifier } from "@/shared/models";
import { hasResponseFailed, resolveWithError } from "@/shared/helpers";

@injectable()
export class StudentService extends AbstractService<Student> {

     protected readonly url ='https://mocki.io/v1/f6d06d8b-b96e-4d25-8a45-2aa567d646ae'

     async create(payload: Student): Promise<Student | string> {
         return Promise.resolve({});
        }

    delete(id: Identifier): Promise<string> {
        return Promise.resolve("");
    }

    async get(): Promise<Student | string> {
        try {
            const _response = await axios.get<Student>(this.url)

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return _response.data
        } catch (e) {
            return e
        }
    }

    update(payload: Partial<Student>): Promise<Student> {
        return Promise.resolve({});
    }

}