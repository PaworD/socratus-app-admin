export * from './student.service'
export * from './course.service'
export * from './toast.service'
export * from './root.service'
export * from './storage.service'
export * from './group.service'
export * from './teacher.service'
export * from './room.service'

export const TYPES = {
  StudentServiceType : Symbol.for('StudentService'),
  CourseServiceType :  Symbol.for('CourseService'),
  ToastServiceType : Symbol.for('ToastService'),
  RootServiceType : Symbol.for('RootService'),
  StorageServiceType : Symbol.for('StorageService'),
  GroupServiceType : Symbol.for('GroupService'),
  TeacherServiceType : Symbol.for('TeacherService'),
  RoomServiceType : Symbol.for('RoomService'),
}