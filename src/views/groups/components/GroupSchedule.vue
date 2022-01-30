<template>
  <div class="groupSchedule">
    <div class="groupSchedule__lead">
      <div>
        <SIconButton borderless @onClick="() => { this.$router.go(-1) }">
          <template v-slot:icon>
            <i class="bi-arrow-left"></i>
          </template>
          Back to <strong>Groups</strong>
        </SIconButton>
      </div>

      <SIconButton @onClick="openCreateScheduleModal">
        Create
      </SIconButton>
    </div>
    <SCalendar :events="events" :controllers="false" @onDaySelect="selectDay"/>
  </div>
</template>

<script lang="ts">

import { Component, PropSync, Vue } from 'vue-property-decorator'
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
  },

  mounted (): void {
    this.getGroupSchedule({ group: this._group.id }).then(events => {
      this.events = events
    })
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
          size: ModalSize.Small,
          persistent: true
        }
    )
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
}
export default GroupSchedule
</script>