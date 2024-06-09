<template>
  <div v-if="booted" class="attendance__controllers">
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
      <SDropdown
          theme="light"
          :list="intervals"
          :value="interval"
          @on-select="onIntervalChange"
          id="intervals-controller"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { AttendanceInterval } from '../Attendance.contracts'

import { SDropdown, DropdownItemProps } from "../../Dropdown"
import { SIconButton } from "../../IconButton"
import { STextInput } from "../../TextInput"

/**
 * @author Javlon Khalimjonov <khalimjnaov.code@gmail.com>
 */
@Component<AttendanceControllers>({
  name: 'AttendanceControllers',
  components: {
    STextInput,
    SDropdown,
    SIconButton
  },
  mounted() {
    this.booted = true
  }
})
export class AttendanceControllers extends Vue {
  /**
   * Interval period of attendance
   */
  public interval = AttendanceInterval.WEEK

  public booted = false

  /**
   * Intervals
   */
  public get intervals (): DropdownItemProps[] {
    return [...Object.entries(AttendanceInterval).map(([key, value]) => {
      return {
        label: key,
        value: value
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
