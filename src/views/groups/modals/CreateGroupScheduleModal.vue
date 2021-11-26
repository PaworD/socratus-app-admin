<template>
  <div class="groupSchedule__modals__create">
    <div class="groupSchedule__modals__create__dates">

      <div class="input-group">
        <label for="startDate">Select start date of lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="selectedStartDate"
                    format="yyyy-MM-dd" id="startDate" placeholder="Start Date" />
      </div>
      <div class="input-group">
        <label for="startDate">Select end date of lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="selectedEndDate"
                    format="yyyy-MM-dd" placeholder="End Date" />
      </div>

      <div class="input-group">
        <label for="room">Room number</label>
        <STextInput flat size="medium" id="room" placeholder="Ex: 001: English" />
      </div>
    </div>

    <div class="groupSchedule__modals__create__days">
      <label for="days">Select days in which lessons will take place</label>
      <div v-for="weekday in weekdays" :key="JSON.stringify(weekday)"
           class="groupSchedule__modals__create__days" id="days">
        <SCheck :id="weekday.label" v-model="days[weekday.label]" >{{weekday.label}}</SCheck>

        <div v-show="days[weekday.label]" class="groupSchedule__modals__create__days__time">
          <VueTimePicker/>

          <VueTimePicker/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Watch } from 'vue-property-decorator'
import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import Datepicker from 'vuejs-datepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VueTimePicker from 'vue2-timepicker'

import {
  SIconButton,
  SButton,
  SBadge,
  SCard,
  STextInput,
  SCheck,
  SRadio
} from '@/shared/components'
import { Weekdays, WeekdaysMap } from '@/views/groups/contracts'


@Component({
  name: 'CreateGroupScheduleModal',
  components: {
    SIconButton,
    SButton,
    SBadge,
    SCard,
    STextInput,
    SCheck,
    SRadio,
    Datepicker,
    VueTimePicker
  }
})
export class CreateGroupScheduleModal extends ModalWrapper {

  public selectedStartDate: string | null = null
  public selectedEndDate: string | null = null

  public days: WeekdaysMap = {
    'Mon': false,
    'Tue': false,
    'Wed': false,
    'Thu': false,
    'Fri': false,
    'Sat': false,
    'Sun': false,
  }

  public get weekdays (): any[] {
    return [...Object.entries(Weekdays).map(([label, value]) => {
      return {
        label,
        value: false
      }
    })]
  }

  @Watch('days', {deep: true})
  onDaysModifies (): void {
    console.log(this.days)
  }

}
export default CreateGroupScheduleModal

</script>