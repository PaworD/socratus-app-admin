<template>
  <div class="groupSchedule">
    <div class="lead">
      <SIconButton @onClick="openCreateScheduleModal">
        Create Schedule
      </SIconButton>
    </div>
    <SCalendar :events="[]" :controllers="false"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { SCalendar, SIconButton } from '@/shared/components'
import CreateGroupScheduleModal from '@/views/groups/modals/CreateGroupScheduleModal.vue'
import { ModalSize } from '@/shared/abstract'

@Component({
  name: 'GroupSchedule',
  components: {
    SCalendar,
    SIconButton
  }
})
export class GroupSchedule  extends Vue {

  public openCreateScheduleModal (): void {
    this.$modalService.open(
        CreateGroupScheduleModal,
        {},
        {
          hasHeader: true,
          headerText: 'Create Schedule',
          size: ModalSize.Small,
          persistent: true
        }
    )
  }
}
export default GroupSchedule
</script>