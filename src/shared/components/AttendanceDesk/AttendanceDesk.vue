<template>
  <div class="attendance">
    <AttendanceControllers @onChangeInterval="onChangeInterval"/>
    <AttendanceTable v-bind="{ data }"
      @onCheckForTrue="onCheckForTrue"
      @onCheckForFalse="onCheckForFalse"
      @onCheckForReason="onCheckForReason"
    />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'

import { AttendanceDesk, AttendanceInterval } from './Attendance.contracts'
import { AttendanceTable } from './partials'
import AttendanceControllers from '@/shared/components/AttendanceDesk/partials/Controllers.vue'

@Component({
  name: "SAttendanceDesk",
  components: {
    AttendanceTable,
    AttendanceControllers
  }
})
export class SAttendanceDesk extends Vue {
  @Prop(  { type: Array, required: true })
  public readonly data!: AttendanceDesk[]

  /**
   * @see AttendanceTable.onCheckForTrue
   * @param id
   */
  public onCheckForTrue (id: number): void {
    this.$emit('onCheckForTrue', id)
  }

  /**
   * @see AttendanceTable.onCheckForFalse
   * @param id
   */
  public onCheckForFalse (id: number): void {
    this.$emit('onCheckForFalse', id)
  }

  /**
   * @see AttendanceTable.onCheckForReason
   * @param data
   */
  public onCheckForReason (data: { id: number, reason: string }): void {
    this.$emit('onCheckForReason', { id : data.id , reason: data.reason })
  }

  public onChangeInterval (interval: AttendanceInterval): void {
    this.$emit('onChangeInterval', interval)
  }
}
export default SAttendanceDesk
</script>