<template>
  <div class="groupSchedule__modals__create">
    <div class="groupSchedule__modals__create__dates">

      <div class="input-group">
        <label for="startDate">Select start date of lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="startDate"
                    format="dd-MM-yyyy" id="startDate" placeholder="Start Date" />
      </div>
      <div class="input-group">
        <label for="startDate">Select end date of lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="endDate"
                    format="dd-MM-yyyy" placeholder="End Date" />
      </div>

      <div class="input-group">
        <label for="room">Room number</label>
        <STextInput flat size="medium" id="room" v-model="payload.roomId" placeholder="Ex: 001: English" />
      </div>
    </div>

    <div class="groupSchedule__modals__create__days">
      <label for="days">Select days in which lessons will take place</label>
      <div v-for="weekday in weekdays" :key="JSON.stringify(weekday)"
           class="groupSchedule__modals__create__days" id="days">
        <SCheck :id="weekday.label" v-model="days[weekday.label]" >{{weekday.label}}</SCheck>

        <div v-show="days[weekday.label]" class="groupSchedule__modals__create__days__time">
          <VueTimePicker v-model="payload.days[weekday.label].startTime"/>
          <VueTimePicker v-model="payload.days[weekday.label].endTime"/>
        </div>
      </div>
    </div>

    <SIconButton @onClick="generateSchedule">
      Submit
    </SIconButton>
  </div>
</template>

<script lang="ts">

import 'vue2-timepicker/dist/VueTimepicker.css'

import { Component, Watch } from 'vue-property-decorator'
import Datepicker from 'vuejs-datepicker'
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

import { ScheduleIntention } from '@/shared/models'

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import { Weekdays, WeekdaysMap } from '@/views/groups/contracts'
import moment from 'moment'
import { Action } from 'vuex-class'


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

  @Action
  public createGroupSchedule!: (payload: { id: number; schedule: ScheduleIntention }) => Promise<void>

  public payload: ScheduleIntention = {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    roomId: '10002',
    days: {
      Mon: {
        startTime: '',
        endTime: ''
      },
      Tue: {
        startTime: '',
        endTime: ''
      },
      Wed: {
        startTime: '',
        endTime: ''
      },
      Thu: {
        startTime: '',
        endTime: ''
      },
      Fri: {
        startTime: '',
        endTime: ''
      },
      Sat: {
        startTime: '',
        endTime: ''
      },
      Sun: {
        startTime: '',
        endTime: ''
      }
    }
  }

  public get startDate (): Date {
    return moment(this.payload.startDate, 'DD-MM-yyyy').toDate()
  }

  public set startDate(date: Date) {
    const _date = new Date(date)
    const fDate = moment(_date).format('DD-MM-yyyy')
    this.payload.startDate = fDate
  }

  public get endDate (): Date {
    return moment(this.payload.startDate, 'DD-MM-yyyy').toDate()
  }

  public set endDate(date: Date) {
    const _date = new Date(date)
    const fDate = moment(_date).format('DD-MM-yyyy')
    this.payload.endDate = fDate
  }

  public days: WeekdaysMap = {
    'Mon': false,
    'Tue': false,
    'Wed': false,
    'Thu': false,
    'Fri': false,
    'Sat': false,
    'Sun': false,
  }

  private preparePayload (): void  {
    Object.entries(this.payload.days).map(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(value, 'startTime') &&
          Object.prototype.hasOwnProperty.call(value, 'endTime')) {
        if (value['startTime'] == '' || value['endTime'] == '') {
          delete this.payload.days[key]
        }
      }
    })
  }

  public generateSchedule (): void {
    this.preparePayload()
    this.createGroupSchedule({id: this.modalData.id, schedule: this.payload})
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