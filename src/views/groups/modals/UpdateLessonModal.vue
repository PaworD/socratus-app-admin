<template>
  <div class="groups__modals__update-lesson">
    <div class="groups__modals__update-lesson__date">
      <div class="input-group">
        <h5>Scheduled date:</h5>
        <Datepicker input-class="input input--medium input--flat" v-model="date"
                    format="dd-MM-yyyy" id="startDate" placeholder="Date" />
      </div>
    </div>
    <h5>Scheduled timing:</h5>
    <div class="groups__modals__update-lesson__time">
      <div class="form-group">
        <span>Start time</span>
        <VueTimePicker v-model="sTime"/>
      </div>
      <div class="form-group">
        <span>End Time</span>
        <VueTimePicker v-model="eTime"/>
      </div>
    </div>

    <h5>Room</h5>
    <div class="groups__modals__update-lesson__event-room">
      <SDropdown :value="room.label" :list="$rooms" @on-select="selectRoom" />
    </div>

    <h5>Teacher</h5>
    <div class="groups__modals__update-lesson__event-teacher">
      <SDropdown :value="teacher.label" :list="$teachers" @on-select="selectTeacher" />
    </div>

    <div class="groups__modals__update-lesson__actions">
      <SIconButton theme="danger">
        Cancel
      </SIconButton>
      <SIconButton theme="default" @onClick="submit">
        Update Class
      </SIconButton>
    </div>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'
import Datepicker from 'vuejs-datepicker'

import { Action, Getter } from 'vuex-class'
import VueTimePicker from 'vue2-timepicker'

import { AnyObject, Room, Teacher } from '@/shared/models'
import {
  STextInput,
  SIconButton,
  DropdownItemProps,
  SDropdown
} from '@/shared/components'
import moment from 'moment'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component<UpdateLessonModal>({
  name: 'UpdateLessonModal',
  components: {
    Datepicker,
    VueTimePicker,
    SIconButton,
    STextInput,
    SDropdown
  },

  mounted (): void {
    this.fetchRooms()
    this.fetchTeachers()
  }
})
export class UpdateLessonModal extends ModalWrapper {

  /**
   * Fetches rooms from server
   */
  @Action
  public fetchRooms!: () => Promise<void>

  /**
   * Fetches teachers from server
   */
  @Action
  public fetchTeachers!: () => Promise<void>

  /**
   * Updates current lesson with given payload
   */
  @Action
  public updateLesson!: (payload: AnyObject) => Promise<void>

  /**
   * Fetches rooms from Vuex.Store
   */
  @Getter
  public rooms!: Room[]

  /**
   * Fetches teachers from Vuex.Store
   */
  @Getter
  public teachers!: Teacher[]

  /**
   * Actual modifiable date
   */
  public date: Date = this.eventDate

  /**
   * Actual Modifiable start time
   */
  public sTime: string = this.startTime

  /**
   * Actual Modifiable start time
   */
  public eTime: string = this.endTime

  /**
   * Actual Modifiable event room
   */
  public room: DropdownItemProps = this.eventRoom

  /**
   * Actual Modifiable teacher of event
   */
  public teacher: DropdownItemProps = this.eventTeacher

  /**
   * Single event for day
   */
  public get event (): AnyObject {
    return this.modalData.date.events[0]
  }

  /**
   * Room in which event will take place
   */
  public get eventRoom (): DropdownItemProps {
    return {
      label: this.event.room.name,
      value: this.event.room.id
    }
  }

  /**
   * Gets the date of event (actually it is selected day)
   */
  public get eventDate (): Date {
    const day = this.event.startTime.split(' ')[0].split('-')[0]
    const month = this.event.startTime.split(' ')[0].split('-')[1] - 1 // As month is 0 indexed
    const year = this.event.startTime.split(' ')[0].split('-')[2]

    return new Date(year, month, day)
  }

  /**
   * Teacher of this event
   */
  public get eventTeacher (): DropdownItemProps {
    return {
      label: `${this.event.teacher.firstName} ${this.event.teacher.lastName}`,
      value: String(this.event.teacher.id)
    }
  }

  /**
   * Id of event
   */
  public get eventId (): number {
    return this.event.id
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

  /**
   * Maps teachers to Dropdown
   */
  public get $teachers (): DropdownItemProps[] {
    return [...this.teachers.map((teacher: Teacher) => {
      return {
        label: `${teacher.firstName} ${teacher.lastName}`,
        value: String(teacher.id)
      }
    })]
  }

  /**
   * Start time of the event
   */
  public get startTime (): string {
    return this.event.startTime.split(' ')[1]
  }

  /**
   * End time of the event
   */
  public get endTime (): string {
    return this.event.endTime.split(' ')[1]
  }

  /**
   * New Room for event
   */
  public selectRoom (room: DropdownItemProps): void {
    this.room = room
  }

  /**
   * New Teacher for event
   */
  public selectTeacher (teacher: DropdownItemProps): void {
    this.teacher = teacher
  }

  /**
   * Updates lesson
   */
  public async submit (): Promise<void> {
    try {
      this.updateLesson({ id: this.eventId, payload: {
          startTime: `${moment(this.date).format('DD-MM-yyyy')} ${this.sTime}`,
          endTime: `${moment(this.date).format('DD-MM-yyyy')} ${this.eTime}`,
          room: this.room.value,
          teacher: this.teacher.value,
          date: moment(this.date).format('DD-MM-yyyy')
        }}).then(() => { this.closeModal(null)}) }
    catch (e) { this.closeModal(null) }
  }

}
export default UpdateLessonModal
</script>
