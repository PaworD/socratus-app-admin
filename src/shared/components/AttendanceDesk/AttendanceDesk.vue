<template>
  <div class="attendance">
    <div class="attendance__controllers">
      <code>ControllersWidget</code>
    </div>
    <AttendanceTable v-bind="{ data }" />
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'

import { AttendanceDesk } from './Attendance.contracts'
import { AttendanceTable } from './partials'

@Component({
  name: "SAttendanceDesk",
  components: {
    AttendanceTable
  }
})
export class SAttendanceDesk extends Vue {
  @Prop(  { type: Array, required: true })
  public readonly data!: AttendanceDesk[]
}
export default SAttendanceDesk
</script>