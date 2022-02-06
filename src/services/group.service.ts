import { AbstractService } from '@/shared/abstract'
import { AnyObject, Group, Pageable, Payment, ScheduleIntention } from '@/shared/models'
import { composeModel, decomposeModel, hasResponseFailed, resolveWithError } from '@/shared/helpers'
import { cleanParameter, injectable } from 'inversify-props'
import { AttendanceDesk, AttendanceInterval, Event } from '@/shared/components'

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

    public async get(query?: AnyObject): Promise<{ results: Group[]; meta: Pageable } | string | { results: Group; meta: Pageable }> {
        try {
            const _response = await this.http.get(this.url, { ...query })

            if(hasResponseFailed(_response)) {
                return resolveWithError(_response)
            }

            const meta: Pageable = {
                totalCount: _response.data.data.total_count,
                previous: _response.data.data.previous,
                next: _response.data.data.next
            }

            return {
                results: composeModel<Group>(_response.data.data.results) as Group[],
                meta
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    public async update(id: number, payload: Partial<Group>): Promise<string | Group> {
        try {
            const response = await this.http.patch(this.url + `/${id}`, decomposeModel(payload))
            return response.data
        } catch (e) {
            throw new Error(e.toString())
        }
    }

    public async removeStudentFromGroup (data: { groupId: number, studentId: number }): Promise<string> {
        try {
            const _response = await this.http.delete(this.url + `/${data.groupId}/remove_student/${data.studentId}`)

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

    public async getGroupAttendance (id: number, interval: AttendanceInterval = AttendanceInterval.WEEK): Promise<AttendanceDesk> {
        try {
            const _response = await this.http.get(this.url + `/${id}/get_attendance?interval_format=${interval}`)

            return composeModel<AttendanceDesk>(_response.data.data) as AttendanceDesk
        } catch (e) {
            throw new Error(e)
        }
    }

    public async createGroupSchedule (payload: { id: number; schedule: ScheduleIntention }): Promise<string> {
        try {
            const _response = await this.http.post(this.url + `/${payload.id}/set_schedule`, {...decomposeModel<ScheduleIntention>(payload.schedule)})

            return _response.data.message
        } catch (e) {
            throw new Error(e)
        }
    }

    public async getGroupSchedule (query: { group: number, month?: number, year?: number }): Promise<Event[]> {
        try {
            const _response = await this.http.get(this.url + `/${query.group}/get_schedule`, { params: { month: query.month, year: query.year } })

            return composeModel<Event>(_response.data.data) as Event[]
        } catch (e) {
            throw new Error(e)
        }
    }

    public async getGroupPayments (query: AnyObject): Promise<Payment[]> {
        try {
            const _response = await this.http.get(this.url + `/${query.group}/get_payments`, { params: { month: query.month, year: query.year } })

            return composeModel<Payment>(_response.data) as Payment[]
        } catch (e) {
            throw new Error(e)
        }
    }
}