<template>
  <table class="attendance__table">
    <thead class="attendance__table__head">
    <tr>
      <th v-for="column in columns" :key="column">
        {{ column }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, rIndex) in rows" :key="JSON.stringify(row)">
      <td>
        {{row.firstName}} {{ row.lastName }}
      </td>
      <td v-for="(date) in data.dates" :key="JSON.stringify(date)"
          @click="onAttendanceDateSelected(currentAttendanceCell(rIndex, date).id)">
        <div class="attendance__table__data_managers">
          <button :class="{ '--checked' : currentAttendanceCell(rIndex, date).attended === attendanceState.ATTENDED }"
                  @click="onCheckForTrue(currentAttendanceCell(rIndex, date).id)">
            <i class="bi-check"></i>
          </button>
          <button :class="{ '--checked' : currentAttendanceCell(rIndex, date).attended === attendanceState.NOT_ATTENDED }"
                  @click="onCheckForFalse(currentAttendanceCell(rIndex, date).id)">
            <i class="bi-x"></i>
          </button>
          <button :class="{ '--checked' : currentAttendanceCell(rIndex, date).attended === attendanceState.DIDNT_EXIST }">
            <i class="bi-question"></i>
          </button>
          <button :class="{'--checked' : hasReason(currentAttendanceCell(rIndex, date))}"
                  @click="onCheckForReason(currentAttendanceCell(rIndex, date).id)">
            <i class="bi-pencil"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

import { AnyObject } from '@/shared/models'

import { AttendanceTableColumn } from './AttendanceTableColumn.vue'
import { AttendanceTableRow } from './AttendanceTableRow.vue'
import { AttendanceDesk, AttendanceState } from '@/shared/components/AttendanceDesk'

@Component({
  name: "AttendanceTable",
  components: {
    AttendanceTableRow,
    AttendanceTableColumn
  }
})
export class AttendanceTable extends Vue {
  @Prop({ type: Array, required: true })
  public data!: AttendanceDesk

  public attendanceState = AttendanceState

  public get rows (): any[] {
    return this.data.students
  }

  public get columns (): string[] {
    return [
      'Name / Last name',
      ...this.data.dates
    ]
  }

  public currentAttendanceCell (rIndex: number, date: string): AnyObject {
    const _attendances = this.rows[rIndex].attendances.filter((att: any) => {
      return att.date === date
    })

    if (_attendances.length === 0 || !_attendances) {
      return {}
    }

    return _attendances[0]
  }

  public hasReason (attendance: AnyObject): boolean {
    if (attendance.attended === AttendanceState.NOT_ATTENDED) {
      return attendance.absenceReason !== ''
    } else {
      return false
    }
  }

  public onAttendanceDateSelected (id: number):void {
    this.$emit('onCellSelected', id)
  }

  public onCheckForTrue (id: number): void {
    this.$emit('onCheckForTrue', id)
  }

  public onCheckForFalse (id: number): void {
    this.$emit('onCheckForFalse', id)
  }

  public onCheckForReason (id: number): void {
    this.$emit('onCheckForReason', id)
  }
}
export default AttendanceTable
</script>