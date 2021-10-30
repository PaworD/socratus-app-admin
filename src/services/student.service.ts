import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Student, Id } from "@/shared/models";
import { composeModel, hasResponseFailed, resolveWithError } from "@/shared/helpers";

@injectable()
export class StudentService extends AbstractService<Student> {

    constructor() {
        super();
    }

     protected readonly url ='/students'

     async create(payload: Student): Promise<Student | string> {
       try {
          //
       } catch (e) {
         return e
       }
     }

     async delete(id: Id): Promise<string> {
         try {
             const response = await this.http.delete(this.url + `/${id}`)

             return response.data.message
         } catch (e) {
             return e.toString()
         }
     }

     async get(): Promise<Student | Student[] | string> {
        try {
            const _response = await this.http.get(this.url)

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            return composeModel<Student>(_response.data.data) as Student[]
        } catch (e) {
            return e
        }
     }

     async update(id: Id, payload: Partial<Student>): Promise<Student> {
        return Promise.resolve({});
     }

}