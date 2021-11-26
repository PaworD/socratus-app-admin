import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Student, Id } from "@/shared/models";
import { composeModel, decomposeModel, hasResponseFailed, resolveWithError } from '@/shared/helpers'

@injectable()
export class StudentService extends AbstractService<Student> {

    constructor() {
        super();
    }

     protected readonly url ='/students'

     async create(payload: Student): Promise<Student | string> {
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

     async update(id: number, payload: Partial<Student>): Promise<Student> {
       try {
         const response = await this.http.put(this.url + `/${id}`, decomposeModel(payload))
         return response.data
       } catch (e) {
         return e.toString()
       }
     }

}