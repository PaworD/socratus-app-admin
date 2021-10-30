import { container } from "inversify-props";

import {
    CourseService,
    GroupService,
    RootService,
    StudentService,
    ToastService,
    LocalStorageService, TeacherService
} from "@/services";

import {
    Course,
    Group,
    Student,
    Teacher
} from "@/shared/models";

/**
 * Main registry of DICs
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export default function _buildDependencyContainer(): void {
    container.addTransient<Student>(StudentService)
    container.addTransient<Course>(CourseService)
    container.addTransient<Group>(GroupService)
    container.addTransient<Teacher>(TeacherService)
    container.addTransient<any>(RootService)
    container.addTransient<any>(LocalStorageService)
    container.addTransient<any>(ToastService)
}