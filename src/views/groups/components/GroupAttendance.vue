<template>
  <SAttendanceDesk v-if="desk" :data="desk" />
</template>

<script lang="ts">

import { Component, PropSync, Vue, Watch } from 'vue-property-decorator'

import { AttendanceDesk, SAttendanceDesk } from '@/shared/components'
import { Action } from 'vuex-class'
import { Group } from '@/shared/models'

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
  public getGroupAttendance!: (id: number) => Promise<AttendanceDesk>

  public desk: AttendanceDesk | null = null


  @Watch('_group')
  onGroupReceived(): void {
    this.getGroupAttendance(this._group.id).then((desk) => {
      this.desk = desk
    })
  }
}
export default GroupAttendance
</script>