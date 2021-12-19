import { injectable } from "inversify-props";

import { AbstractService } from "@/shared/abstract";
import { Student, Id, AnyObject, Pageable, CreateStudentIntention } from '@/shared/models'
import { composeModel, decomposeModel, hasResponseFailed, resolveWithError } from '@/shared/helpers'

@injectable()
export class StudentService extends AbstractService<Student> {

    constructor() {
        super();
    }

     protected readonly url ='/students'

     async create(payload: CreateStudentIntention): Promise<Student | string> {
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

     async get(query?: AnyObject): Promise<{ results: Student; meta: Pageable } | { results: Student[]; meta: Pageable } | string> {
        try {
            const _response = await this.http.get(this.url, { params: {...query} })

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            const meta: Pageable = {
              totalCount: _response.data.data.total_count,
              previous: _response.data.data.previous,
              next: _response.data.data.next
            }

            return {
              results: composeModel<Student>(_response.data.data.results) as Student[],
              meta
            }
        } catch (e) {
            throw new Error(e)
        }
     }

     async update(id: number, payload: Partial<Student>): Promise<Student> {
       try {
         const response = await this.http.patch(this.url + `/${id}`, decomposeModel(payload))
         return response.data
       } catch (e) {
         throw new Error(e.toString())
       }
     }

}