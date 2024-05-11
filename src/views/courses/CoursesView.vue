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
    <CoursesFilters v-if="isFiltersActive" :items.sync="allCourses" />
    <!--    <div v-if="allCourses && !isLoading" class="courses__list">-->
    <transition-group name="flip-complete" tag="div" class="courses__list"
                      v-if="allCourses && !isLoading" appear>
      <SingleCourse v-for="course in courses" :key="course.id" :course="course"
                    @updateCourse="openUpdateCourseModal" @deleteCourse="openDeleteCourseModal" />
    </transition-group>
    <!--    </div>-->
    <div class="courses__list" v-else>
      <SSkeleton v-for="i in 10" :key="i" type="block" />
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { AnyObject, Course } from '@/shared/models'
import { ModalSize } from '@/shared/abstract'
import { SBadge, SButton, SCard, SIconButton, SImage, SSkeleton } from '@/shared/components'

import { SingleCourse } from './components/Course.vue'
import { CreateCourseModal } from './modals/CreateCourseModal.vue'
import { DeleteCourseModal } from './modals/DeleteCourseModal.vue'
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
    SSkeleton,
    SImage,
    SingleCourse
  },

  mounted (): void {
    this.fetchCourses({ ...this.queryParams, page_size: 30 }).then(() => {
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

  public async openCreateCourseModal (): Promise<void> {
    const shouldUpdate = await this.$modalService.open(
      CreateCourseModal,
      { payload: 'Create Course Payload' },
      {
        size: ModalSize.ExtraSmall,
        persistent: false,
        hasHeader: true,
        headerText: 'Create Course'
      }
    )

    if (shouldUpdate)
      this.fetchCourses({ ...this.queryParams, page_size: 30 }).then(() => {
        this.allCourses = this.courses
        this.isLoading = false
      })
  }

  public async openUpdateCourseModal (course: Course): Promise<void> {
    const shouldUpdate = await this.$modalService.open(
      CreateCourseModal,
      {
        id: course.id,
        course: course
      },
      {
        size: ModalSize.ExtraSmall,
        persistent: false,
        hasHeader: true,
        headerText: 'Update Course'
      }
    )


    if (shouldUpdate)
      this.fetchCourses({ ...this.queryParams, page_size: 30 }).then(() => {
        this.allCourses = this.courses
        this.isLoading = false
      })
  }

  public async openDeleteCourseModal (course: Course): Promise<void> {
    const modalResponse = await this.$modalService.open(
      DeleteCourseModal,
      {
        id: course.id,
        name: course.name
      },
      {
        size: ModalSize.ExtraSmall,
        persistent: false,
        hasHeader: true,
        headerText: 'Delete Course'
      }
    )
    if (typeof modalResponse !== 'undefined') {
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
  /* .list-complete-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
