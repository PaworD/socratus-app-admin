import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from "./types";

import { AdminModule } from "@/store/modules/admin.module";
import { AttendanceModule } from '@/store/modules/attendance.module'
import { ApplicantsModule } from '@/store/modules/applicants.module'
import { CourseModule } from "@/store/modules/course.module";
import { GroupModule} from "@/store/modules/group.module";
import { ResourceModule } from '@/store/modules/resource.module'
import { RootModule } from "@/store/modules/root.module";
import { RoomModule } from '@/store/modules/room.module'
import { StudentModule } from "@/store/modules/student.module";
import { TeacherModule } from "@/store/modules/teacher.module";
import { LessonModule } from "@/store/modules/lesson.module";

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0-beta.1',
    auth: false
  },
  mutations: {
    setAuth : (state: RootState, payload: boolean) => {
      state.auth = payload
    }
  },
  getters: {
    authState : state => state.auth
  },
  modules: {
    ApplicantsModule,
    AttendanceModule,
    CourseModule,
    GroupModule,
    LessonModule,
    RootModule,
    TeacherModule,
    AdminModule,
    StudentModule,
    RoomModule,
    ResourceModule
  }

}

export default new Vuex.Store<RootState>(store)