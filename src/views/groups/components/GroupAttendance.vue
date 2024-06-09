<template>
  <div>
    <SAttendanceDesk v-if="desk" :attendanceDesk="desk"
                     @onCheckForTrue="checkForTrue"
                     @onCheckForFalse="checkForFalse"
                     @onCheckForReason="checkForReason"
                     @onChangeInterval="setNewInterval"
    />
  </div>
</template>

<script lang="ts">

import { Component, PropSync, Vue, Watch } from 'vue-property-decorator'

import { AttendanceDesk, AttendanceInterval, SAttendanceDesk } from '@/shared/components'
import { Action } from 'vuex-class'
import { AnyObject, Group } from '@/shared/models'
import CreateAttendanceReasonModal from '@/views/groups/modals/CreateAttendanceReasonModal.vue'
import { ModalSize } from '@/shared/abstract'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gamil.com>
 */
@Component<GroupAttendance>({
  name: "GroupAttendance",
  components: {
    SAttendanceDesk
  }
})
export class GroupAttendance extends Vue {

  @PropSync( 'group', { type: Object, required: false, default: () => ({}) })
  public _group!: Group

  @Action
  public getGroupAttendance!: (payload: { id: number, interval: AttendanceInterval }) => Promise<AttendanceDesk>

  @Action
  private fetchGroups!: () => Promise<void>

  /**
   * Updates attendance by given payload
   */
  @Action
  public updateAttendance!: (payload: AnyObject) => Promise<void>

  /**
   * Table of attendance
   */
  public desk: AttendanceDesk | null = null

  /**
   * Interval
   */
  private interval: AttendanceInterval = AttendanceInterval.WEEK

  /**
   * @see AttendanceDesk.onCheckForTrue
   * @param id
   */
  public async checkForTrue (id: number): Promise<void> {
    try {
      await this.updateAttendance({ id: id , data: { attended: true , absence_reason: null }})
      await this.fetchGroups()
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @see AttendanceDesk.onCheckForFalse
   * @param id
   */
  public async checkForFalse (id: number): Promise<void> {
    try {
      await this.updateAttendance({ id: id , data: { attended: false , absence_reason: null }})
      await this.fetchGroups()
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * @see AttendanceDesk.onCheckForReason
   * @param data
   */
  public async checkForReason (data: { id: number, reason: string }): Promise<void> {
    await this.$modalService.open(CreateAttendanceReasonModal, { id: data.id, reason: data.reason }, {
      headerText: 'Absence reason',
      hasHeader: true,
      persistent: true,
      size: ModalSize.ExtraSmall,
    })
    await this.fetchGroups()
  }

  /**
   * Sets new interval for current attendance view
   * @param interval
   */
  public async setNewInterval (interval: AttendanceInterval): Promise<void> {
    this.interval = interval
    try {
      this.getGroupAttendance({ id: this._group.id, interval: interval }).then((desk) => {
        this.desk = desk
      })
    } catch (e) {
      console.log(e)
    }
  }

  @Watch('_group')
  onGroupReceived(): void {
    this.getGroupAttendance({ id: this._group.id, interval: this.interval }).then((desk) => {
      this.desk = desk
    })
  }
}
export default GroupAttendance
</script>
