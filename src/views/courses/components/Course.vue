<template>
  <SCard body-class="course__card__body" borderless>
    <template v-slot:body>
      <div class="course__hero">
        <div class="action-group">
          <SIconButton @onClick="updateCourse">
            <template v-slot:icon>
              <i class="bi-pen-fill"></i>
            </template>
          </SIconButton>
          <SIconButton @onClick="deleteCourse">
            <template v-slot:icon>
              <i class="bi-trash-fill" style="color: #9a381a"></i>
            </template>
          </SIconButton>
        </div>
        <div class="course-badges">
          <SBadge v-if="course.level" :title="course.level" theme="light" />
        </div>
        <SImage src="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/202009/e-learning_digital_education-1200x1080.jpg?XjMNHsb4gLoU_cC7110HB7jVghJQROOj" alt="" />
      </div>
      <div class="course__description">
        <p>{{ course.name }}</p>
        <money v-model.lazy="course.price" id="course-price"
               v-bind="{ ...moneyMask, prefix:`${course.priceCurrency.toUpperCase()} `}" disabled aria-readonly="true" />
      </div>
    </template>
  </SCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Money } from 'v-money'

import { AnyObject } from '@/shared/models'
import { SCard, SIconButton, SBadge, SImage } from '@/shared/components'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'SingleCourse',
  components: {
    SCard,
    SIconButton,
    SBadge,
    SImage,
    Money,
  }
})
export class SingleCourse extends Vue {
  @Prop({ type: Object, required: true })
  public readonly course!: AnyObject

  /**
   * Config for v-money mask input.
   */
  public readonly moneyMask = {
    precision: 0,
    decimal: ',',
    thousands: ' ',
    masked: false
  }

  /**
   * Emits update course event.
   */
  public updateCourse(): void {
    this.$emit('updateCourse', this.course)
  }

  /**
   * Emits delete course event.
   */
  public deleteCourse(): void {
    this.$emit('deleteCourse', this.course)
  }
}
export default SingleCourse
</script>
