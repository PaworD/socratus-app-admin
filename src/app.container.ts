import { container } from "inversify-props";

import {
    CourseService,
    GroupService,
    RootService,
    StudentService,
    ToastService,
    LocalStorageService,
    TeacherService,
    RoomService, TYPES, ResourceService, ApplicantsService
} from '@/services'

/**
 * Main registry of DICs
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export default function _buildDependencyContainer(): void {
    container.bind<ApplicantsService>(TYPES.ApplicantsServiceType).to(ApplicantsService),
    container.bind<StudentService>(TYPES.StudentServiceType).to(StudentService)
    container.bind<CourseService>(TYPES.CourseServiceType).to(CourseService)
    container.bind<GroupService>(TYPES.GroupServiceType).to(GroupService)
    container.bind<TeacherService>(TYPES.TeacherServiceType).to(TeacherService)
    container.bind<RoomService>(TYPES.RoomServiceType).to(RoomService)
    container.bind<RootService>(TYPES.RootServiceType).to(RootService)
    container.bind<LocalStorageService>(TYPES.StorageServiceType).to(LocalStorageService)
    container.bind<ToastService>(TYPES.ToastServiceType).to(ToastService)
    container.bind<ResourceService>(TYPES.ResourceServiceType).to(ResourceService)
}