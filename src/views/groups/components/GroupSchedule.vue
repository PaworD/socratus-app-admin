<template>
  <div class="groupSchedule">
    <div class="groupSchedule__lead">
      <SIconButton @onClick="openCreateScheduleModal">
        <template v-slot:icon>
          <i class="bi-plus"></i>
        </template>
        Create
      </SIconButton>
    </div>
    <SCalendar :events="events" :controllers="false" @onDaySelect="selectDay"/>
  </div>
</template>

<script lang="ts">

import {Component, PropSync, Vue, Watch} from 'vue-property-decorator'
import { SCalendar, SIconButton } from '@/shared/components'
import CreateGroupScheduleModal from '@/views/groups/modals/CreateGroupScheduleModal.vue'
import { ModalSize } from '@/shared/abstract'
import { Group } from '@/shared/models'
import { Action } from 'vuex-class'
import UpdateLessonModal from '@/views/groups/modals/UpdateLessonModal.vue'

@Component<GroupSchedule>({
  name: 'GroupSchedule',
  components: {
    SCalendar,
    SIconButton
  }
})
export class GroupSchedule  extends Vue {
  @PropSync( 'group', { type: Object, required: false, default: () => ({}) })
  public _group!: Group

  @Action
  public getGroupSchedule!: (query: { group: number, month?: number, year?: number }) => Promise<Event[]>

  public events: Event[] = []

  public openCreateScheduleModal (): void {
    this.$modalService.open(
        CreateGroupScheduleModal,
        {
          id: this._group.id
        },
        {
          hasHeader: true,
          headerText: 'Create Schedule',
          size: ModalSize.FullScreen,
          persistent: true
        }
    ).then((success) => {
      if (success) {
        this.getGroupSchedule({ group: this._group.id }).then(events => {
          this.events = events
        })      }
    })
  }

  public selectDay (date: any): void {
    if (date.events.length === 0) {
      return
    }

    this.$modalService.open(
        UpdateLessonModal,
        {
          date: date
        },
        {
          hasHeader: true,
          headerText: 'Update Lesson',
          size: ModalSize.ExtraSmall,
          persistent: true
        }
    )
  }

  @Watch('group')
  protected onGroup (): void {
    this.getGroupSchedule({ group: this._group.id }).then(events => {
      this.events = events
    })
  }
}
export default GroupSchedule
</script>
