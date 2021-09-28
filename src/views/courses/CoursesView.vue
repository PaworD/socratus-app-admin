<template>
  <div class="courses">
    <div class="courses__lead">
      <h2>Courses List</h2>
      <SButton size="small" theme="transparent" label="+" tooltip="Add Course" flat @onClick="openCreateCourseModal" />
    </div>
    <div class="courses__list">
      <SCard body-class="course__card__body" borderless>
        <template v-slot:body>
          <div class="course__hero">
            <img src="@/assets/courses/english-advanced.jpg" alt="">
          </div>
          <div class="course__description">
            <p>Advanced IELTS for 7.0+</p>
            <span>200 000 som</span>
          </div>
        </template>
      </SCard>
      <SCard body-class="course__card__body" borderless>
        <template v-slot:body>
          <div class="course__hero">
            <img src="@/assets/courses/math.jpg" alt="">
          </div>
          <div class="course__description">
            <p>Advanced Mathematics for SAT</p>
            <span>200 000 som</span>
          </div>
        </template>
      </SCard>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {SCard} from "@/shared/components/Card";
import {SButton} from "@/shared/components/Button";
import {CreateCourseModal} from "@/views/courses/modals/CreateCourseModal.vue";
import {ModalSize} from "@/shared/abstract";

@Component<CoursesView>({
  name: 'CoursesView',
  components: {
    SCard,
    SButton
  }
})
export class CoursesView extends Vue {

  public async openCreateCourseModal (): Promise<void> {
    await this.$modalService.open(CreateCourseModal,
        {payload: 'Create Course Payload'},
        {
          size: ModalSize.ExtraSmall,
          persistent: false,
          hasHeader: true
        })
  }
}
export default CoursesView
</script>

<style scoped lang="scss">

</style>