import { Identifier } from './atom'
import { Resource } from './resource.model'
import { Course } from './course.model'

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export enum ApplicantStatus {
  WAITING_FOR_REVIEW = 1,
  WAITING_FOR_GROUP = 2,
  TRIAL_LESSON = 3,
  STUDYING = 4,
  CANCELED = 5
}

export const applicantStatus: Record<ApplicantStatus, string> = {
  [ApplicantStatus.WAITING_FOR_REVIEW]: 'On Review',
  [ApplicantStatus.WAITING_FOR_GROUP]: 'ON Group',
  [ApplicantStatus.TRIAL_LESSON]: 'Trial',
  [ApplicantStatus.STUDYING]: 'Student',
  [ApplicantStatus.CANCELED]: 'Canceled'
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface IApplicant {
  fullName(): string
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface ApplicantData extends Identifier {
  availableTime: string
  applyingCourse: Course
  createdAt: string
  email: string
  firstName: string
  lastName: string
  note: string
  phone: string
  resource: Resource
  status: ApplicantStatus
  updatedAt: string
}

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export type ApplicantModel = ApplicantData & IApplicant

export class Applicant implements ApplicantModel  {

  public id: number
  createdAt: string
  public firstName: string
  public lastName: string
  public availableTime: string
  public applyingCourse: Course
  public email: string
  public note: string
  public phone: string
  public status: ApplicantStatus
  public resource: Resource
  public updatedAt: string

  constructor (
    id: number,
    availableTime: string,
    applyingCourse: Course,
    createdAt: string,
    email: string,
    firstName: string,
    lastName: string,
    note: string,
    phone: string,
    status: ApplicantStatus,
    resource: Resource,
    updatedAt: string) {
    this.id = id
    this.availableTime = availableTime
    this.applyingCourse = applyingCourse
    this.createdAt = createdAt
    this.email = email
    this.note = note
    this.phone = phone
    this.status = status
    this.resource = resource
    this.firstName = firstName
    this.lastName = lastName
    this.updatedAt = updatedAt
  }

  /**
   * Gets the full name of applicant
   */
  public fullName (): string {
    return this.firstName + ' ' + this.lastName
  }
}