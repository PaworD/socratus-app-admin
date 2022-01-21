export * from './attendance.service'
export * from './applicants.service'
export * from './course.service'
export * from './group.service'
export * from './lesson.service'
export * from './resource.service'
export * from './room.service'
export * from './root.service'
export * from './storage.service'
export * from './student.service'
export * from './teacher.service'
export * from './toast.service'

export const TYPES = {
  AttendanceServiceType : Symbol.for('AttendanceService'),
  ApplicantsServiceType : Symbol.for('ApplicantsService'),
  CourseServiceType :  Symbol.for('CourseService'),
  GroupServiceType : Symbol.for('GroupService'),
  LessonServiceType : Symbol.for('LessonService'),
  RootServiceType : Symbol.for('RootService'),
  RoomServiceType : Symbol.for('RoomService'),
  ResourceServiceType : Symbol.for('ResourceService'),
  StudentServiceType : Symbol.for('StudentService'),
  StorageServiceType : Symbol.for('StorageService'),
  TeacherServiceType : Symbol.for('TeacherService'),
  ToastServiceType : Symbol.for('ToastService')
}