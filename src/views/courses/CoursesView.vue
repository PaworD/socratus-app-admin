<template>
  <div class="courses">
    <div class="courses__lead">
      <h2>Courses List</h2>
      <SIconButton @onClick="openCreateCourseModal">
        <template v-slot:icon>
          <i class="bi-plus-circle"></i>
        </template>
      </SIconButton>
    </div>
    <div v-if="courses" class="courses__list">
      <SCard v-for="course in courses" :key="course.id" body-class="course__card__body" borderless>
        <template v-slot:body>
          <div class="course__hero">
            <div class="action-group">
              <SIconButton>
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
            <img :src="courseImg(course.name)" alt="">
          </div>
          <div class="course__description">
            <p>{{ course.name }}</p>
            <span>{{ course.price }} {{ course.priceCurrency.toUpperCase() }}</span>
          </div>
        </template>
      </SCard>
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
import {Course} from "@/shared/models";
import {SIconButton} from "@/shared/components/IconButton";
import { imageFromText } from "@/shared/helpers"

/**
 * @author Javlon Khalimjonov <khalimjonov@gmail.com>
 */
@Component<CoursesView>({
  name: 'CoursesView',
  components: {
    SCard,
    SButton,
    SIconButton
  },

  mounted (): void {
    this.fetchCourses()
  }
})
export class CoursesView extends Vue {

  @Action
  public fetchCourses!: () => Promise<void>

  @Getter
  public courses!: Course[]

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
          headerText: 'Create Course'
        })
    console.log(modalResponse)
    if(typeof modalResponse !== 'undefined') {
      this.courses.splice(this.courses.indexOf(course), 1)
    }
  }

}
export default CoursesView
</script>

<style scoped lang="scss">

</style>