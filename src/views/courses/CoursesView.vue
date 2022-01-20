<template>
  <div class="courses">
    <div class="courses__lead">
      <h2>Courses List</h2>
      <div class="courses__lead__btns">
        <SIconButton @onClick="toggleFiltersBar" :class="{ '--active' : isFiltersActive }">
          <template v-slot:icon>
            <i class="bi-filter"></i>
          </template>
          Filters
        </SIconButton>
        <SIconButton @onClick="openCreateCourseModal">
          <template v-slot:icon>
            <i class="bi-plus-circle"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <CoursesFilters v-if="isFiltersActive" :items.sync="allCourses"/>
<!--    <div v-if="allCourses && !isLoading" class="courses__list">-->
      <transition-group name="flip-complete" tag="div" class="courses__list" v-if="allCourses && !isLoading" appear>
        <SCard v-for="course in allCourses" :key="course.id" body-class="course__card__body" borderless>
          <template v-slot:body>
            <div class="course__hero">
              <div class="action-group">
                <SIconButton @onClick="openUpdateCourseModal(course)">
                  <template v-slot:icon>
                    <i class="bi-pen-fill"></i>
                  </template>
                </SIconButton>
                <SIconButton @onClick="openDeleteCourseModal(course)">
                  <template v-slot:icon>
                    <i class="bi-trash-fill" style="color: #9a381a"></i>
                  </template>
                </SIconButton>
              </div>
              <div class="course-badges">
                <SBadge v-if="course.level" :title="course.level" theme="light" />
              </div>
              <img :src="'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/1280px-Books_HD_%288314929977%29.jpg'" alt="">
            </div>
            <div class="course__description">
              <p>{{ course.name }}</p>
              <span>{{ course.price }} {{ course.priceCurrency.toUpperCase() }}</span>
            </div>
          </template>
        </SCard>
      </transition-group>
<!--    </div>-->
    <div class="courses__list" v-else>
      <SSkeleton v-for="i in 10" :key="i" type="block" />
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import {SCard} from "@/shared/components/Card";
import {SButton} from "@/shared/components/Button";
import {CreateCourseModal} from "@/views/courses/modals/CreateCourseModal.vue";
import {DeleteCourseModal} from "@/views/courses/modals/DeleteCourseModal.vue";
import {ModalSize} from "@/shared/abstract";
import {Action, Getter} from "vuex-class";
import { AnyObject, Course } from '@/shared/models'
import {SIconButton} from "@/shared/components/IconButton";
import { imageFromText } from "@/shared/helpers"
import { SSkeleton, SBadge } from '@/shared/components'
import CoursesFilters from './filters/CourseFilters.vue'

/**
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
@Component<CoursesView>({
  name: 'CoursesView',
  components: {
    SCard,
    SButton,
    SIconButton,
    SBadge,
    CoursesFilters,
    SSkeleton
  },

  mounted (): void {
    this.isLoading = true
    this.fetchCourses(this.queryParams).then(() => {
      this.allCourses = this.courses
      this.isLoading = false
    })
  }
})
export class CoursesView extends Vue {

  @Action
  public fetchCourses!: (query?: AnyObject) => Promise<void>

  @Getter
  public courses!: Course[]

  public allCourses: Course[] = []
  public isFiltersActive = false

  public isLoading = false

  public get queryParams (): AnyObject {
    return this.$route.query
  }

  public courseImg(courseName: string): string {
    return imageFromText(courseName)
  }

  public async openCreateCourseModal (): Promise<void> {
    await this.$modalService.open(CreateCourseModal,
        {payload: 'Create Course Payload'},
        {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true,
          headerText: 'Create Course'
        })
  }

  public async openUpdateCourseModal (course: Course): Promise<void> {
    await this.$modalService.open(CreateCourseModal,
        {
          id: course.id,
          course: course
        },
        {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true,
          headerText: 'Update Course'
        })
  }

  public async openDeleteCourseModal (course: Course): Promise<void> {
    const modalResponse = await this.$modalService.open(DeleteCourseModal,
        {
          id: course.id,
          name: course.name
        },
        {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true,
          headerText: 'Delete Course'
        })
    if(typeof modalResponse !== 'undefined') {
      this.courses.splice(this.courses.indexOf(course), 1)
    }
  }

  public toggleFiltersBar (): void {
    this.isFiltersActive = !this.isFiltersActive
  }

}
export default CoursesView
</script>

<style scoped lang="scss">
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>