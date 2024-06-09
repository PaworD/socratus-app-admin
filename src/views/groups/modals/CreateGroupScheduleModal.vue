<template>
  <div class="groupSchedule__modals__create">
    <h4>Interval settings</h4>
    <div class="groupSchedule__modals__create__dates">
      <div class="input-group">
        <label for="startDate">Select start date of the lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="payload.startDate"
                    format="dd-MM-yyyy" id="startDate" placeholder="Start Date" value-type="format" />
      </div>
      <div class="input-group">
        <label for="startDate">Select end date of the lesson</label>
        <Datepicker input-class="input input--medium input--flat" v-model="payload.endDate"
                    format="dd-MM-yyyy" placeholder="End Date" value-type="format" />
      </div>

      <div class="input-group">
        <label for="room">Room</label>
        <SDropdown :list="$rooms" :value="payload.roomId" theme="light" @on-select="selectRoom" />
      </div>
    </div>


    <h4>Days</h4>
    <label for="days">Select days in which lesson will take place</label>
    <div class="groupSchedule__modals__create__days">
      <div v-for="weekday in weekdays" :key="JSON.stringify(weekday)" class="groupSchedule__modals__create__days__day" id="days">
        <SCheck :id="weekday.label" v-model="days[weekday.label]" >{{weekday.label}}</SCheck>

        <div v-show="days[weekday.label]" class="groupSchedule__modals__create__days__time">
          <VueTimePicker v-model="payload.days[weekday.label].startTime"/>
          <VueTimePicker v-model="payload.days[weekday.label].endTime"/>
        </div>
      </div>
    </div>

    <div class="groupSchedule__modals__create__footer">
      <div>
        <span class="groupSchedule__modals__create__footer__error" v-if="error">
          <i class="bi-info-circle"></i>
          {{ error }}
        </span>
      </div>

      <div class="groupSchedule__modals__create__footer__actions">
        <SIconButton theme="danger" @onClick="closeModal(null)">
          Cancel
        </SIconButton>

        <SIconButton :disabled="!isReady" @onClick="generateSchedule">
          Submit
        </SIconButton>
      </div>
    </div>
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
  SDropdown,
  SCheck,
  SRadio, DropdownItemProps
} from '@/shared/components'

import {Room, ScheduleIntention} from '@/shared/models'

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'
import { Weekdays, WeekdaysMap } from '@/views/groups/contracts'
import moment from 'moment'
import {Action, Getter} from 'vuex-class'


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
    SDropdown,
    VueTimePicker
  }
})
export class CreateGroupScheduleModal extends ModalWrapper {
  @Action
  public createGroupSchedule!: (payload: { id: number; schedule: ScheduleIntention }) => Promise<void>

  @Getter
  public rooms!: Room[]

  public room: DropdownItemProps | null = null
  public error: string | null = null

  public payload: ScheduleIntention = {
    startDate: moment().format('DD-MM-yyyy'),
    endDate: moment().format('DD-MM-yyyy'),
    roomId: 'Select room',
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

  public days: WeekdaysMap = {
    'Mon': false,
    'Tue': false,
    'Wed': false,
    'Thu': false,
    'Fri': false,
    'Sat': false,
    'Sun': false,
  }

  /**
   * Mapped rooms to Dropdown
   */
  public get $rooms (): DropdownItemProps[] {
    return [...this.rooms.map((room: Room) => {
      return {
        label: String(room.name),
        value: String (room.id)
      }
    })]
  }

  public get isReady (): boolean {
    return Object.values(this.payload.days).some(v => {
      return ('startTime' in v && v['startTime'] !== '') && ('endTime' in v && v['endTime'] !== '')
    })
  }

  private preparePayload (): void {
    Object.entries(this.payload.days).map(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(value, 'startTime') &&
          Object.prototype.hasOwnProperty.call(value, 'endTime')) {
        if (value['startTime'] == '' || value['endTime'] == '') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          delete this.payload.days[key]
        }
      }
    })

    if (typeof this.payload.startDate !== 'string') {
      const fDate = moment(this.payload.startDate).format('DD-MM-yyyy')
      this.payload.startDate = fDate
    }

    if (typeof this.payload.endDate !== 'string') {
      const fDate = moment(this.payload.endDate).format('DD-MM-yyyy')
      this.payload.endDate = fDate
    }
  }

  public generateSchedule (): void {
    this.error = null

    if (this.payload.roomId === 'Select room') {
      this.error = 'Please select room'
      return
    }

    this.preparePayload()
    this.createGroupSchedule({id: this.modalData.id, schedule: this.payload}).then(() => {
      this.closeModal(true)
    })
  }

  public get weekdays (): any[] {
    return [...Object.entries(Weekdays).map(([label, value]) => {
      return {
        label,
        value: false
      }
    })]
  }

  public selectRoom (room: DropdownItemProps): void {
    this.payload.roomId = room.value!
  }
}
export default CreateGroupScheduleModal

</script>
