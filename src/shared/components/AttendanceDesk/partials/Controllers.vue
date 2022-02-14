<template>
  <div class="attendance__controllers">
    <div class="attendance__controllers__btns">
      <SIconButton>
        <template>
          <i class="bi-chevron-bar-left"></i>
        </template>
      </SIconButton>
        {{ interval }}
      <SIconButton>
        <template>
          <i class="bi-chevron-bar-right"></i>
        </template>
      </SIconButton>
    </div>

    <div class="attendance__controllers__intervals">
      <SDropdown :list="intervals" value="Select interval" theme="light" @on-select="onIntervalChange" />
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import {
  AttendanceInterval,
  DropdownItemProps,
  SDropdown,
  SIconButton,
  STextInput
} from '@/shared/components'

/**
 * @author Javlon Khalimjonov <khalimjnaov.code@gmail.com>
 */
@Component({
  name: 'Controllers',
  components: {
    STextInput,
    SDropdown,
    SIconButton
  }
})
export class AttendanceControllers extends Vue {
  /**
   * Interval period of attendance
   */
  public interval = AttendanceInterval.WEEK

  /**
   * Intervals
   */
  public get intervals (): DropdownItemProps[] {
    return [...Object.entries(AttendanceInterval).map(([key, value]) => {
      return {
        label: String(key),
        value: String(value)
      }
    })]
  }

  /**
   * Emits new interval value
   *
   * @param interval
   */
  public onIntervalChange (interval: DropdownItemProps): void {
    this.interval = interval.value as AttendanceInterval
    this.$emit('onChangeInterval', interval.value)
  }

}
export default AttendanceControllers
</script>