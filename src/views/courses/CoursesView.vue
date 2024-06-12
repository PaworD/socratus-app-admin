<template>
  <div class="courses">
    <div class="courses__lead">
      <h2>Courses List</h2>
      <div class="courses__lead__btns">
        <STextInput
            type="text"
            :errors="[]"
            size="small"
            flat
            with-radius
            placeholder="Search course..."
            v-model="searchQuery"
        />
        <SIconButton @onClick="openCreateCourseModal">
          <template v-slot:icon>
            <i class="bi-plus-circle"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <!--    <div v-if="allCourses && !isLoading" class="courses__list">-->
    <transition-group name="flip-complete" tag="div" class="courses__list"
                      v-if="allCourses && !isLoading" appear>
      <SingleCourse v-for="course in allCourses" :key="course.id" :course="course"
                    @updateCourse="openUpdateCourseModal" @deleteCourse="openDeleteCourseModal"/>
    </transition-group>
    <!--    </div>-->
    <div class="courses__list" v-else>
      <SSkeleton v-for="i in 10" :key="i" type="block"/>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from 'vue-property-decorator'
import {Action, Getter} from 'vuex-class'

import {AnyObject, Course} from '@/shared/models'
import {ModalSize} from '@/shared/abstract'
import {SBadge, SButton, SCard, SIconButton, SImage, SSkeleton, STextInput} from '@/shared/components'

import {SingleCourse} from './components/Course.vue'
import {CreateCourseModal} from './modals/CreateCourseModal.vue'
import {DeleteCourseModal} from './modals/DeleteCourseModal.vue'
import CoursesFilters from './filters/CourseFilters.vue'
import {DeleteModal} from "@/shared/modals";

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
    SingleCourse,
    STextInput
  },

  mounted(): void {
    this.fetchCourses({...this.queryParams, page_size: 30}).then(() => {
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
  public searchQuery = ''

  public get queryParams(): AnyObject {
    return this.$route.query
  }

  public async openCreateCourseModal(): Promise<void> {
    const shouldUpdate = await this.$modalService.open(
        CreateCourseModal,
        {payload: 'Create Course Payload'},
        {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true,
          headerText: 'Create Course'
        }
    )

    if (shouldUpdate)
      this.fetchCourses({...this.queryParams, page_size: 30}).then(() => {
        this.allCourses = this.courses
        this.isLoading = false
      })
  }

  public async openUpdateCourseModal(course: Course): Promise<void> {
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
      this.fetchCourses({...this.queryParams, page_size: 30}).then(() => {
        this.allCourses = this.courses
        this.isLoading = false
      })
  }

  public async openDeleteCourseModal(course: Course): Promise<void> {
    const modalResponse = await this.$modalService.open(DeleteModal,
        {
          id: course.id,
          module: 'course',
          message: `Are you sure to delete course: ${course.name} `
        },
        {
          hasHeader: true,
          size: ModalSize.ExtraSmall,
          persistent: false
        })

    if (modalResponse) {
      try {
        this.isLoading = true
        await this.fetchCourses({...this.queryParams, page_size: 30})
        this.allCourses = this.courses
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }

  public toggleFiltersBar(): void {
    this.isFiltersActive = !this.isFiltersActive
  }

  @Watch('searchQuery')
  protected onSearch(val: string): void {
    this.allCourses = [...this.courses].filter((course) => {
      return course.name.indexOf(val) !== -1
    })
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
