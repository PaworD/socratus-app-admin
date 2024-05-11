<template>
  <div class="timetable">
    <!-- Controllers -->
    <div class="timetable__controllers">
<!--      <SIconButton @onClick="switchMode">-->
<!--        {{ currentMode }}-->
<!--      </SIconButton>-->

      <div class="timetable__controllers__date">
        <SIconButton @onClick="prevDay" :disabled="loading">
          <template v-slot:icon>
            <i class="bi-arrow-left"></i>
          </template>
        </SIconButton>

        <span>{{ date.format('DD MMM') }}</span>

        <SIconButton @onClick="nextDay" :disabled="loading">
          <template v-slot:icon>
            <i class="bi-arrow-right"></i>
          </template>
        </SIconButton>
        <SIconButton>
          <template v-slot:icon>
            <i class="bi-pencil-square"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <!-- END | Controllers -->

    <!-- Timeline [hours] -->
    <div class="timetable__timeline" ref="timeline">
      <span v-for="hour in hours" :key="hour.key" :hour="'30'">
        {{hour.key}}
      </span>
    </div>
    <!-- END | Timeline -->

    <!-- Timetable -->
    <div v-if="!loading" class="timetable__table">
      <div class="timetable__table__cell"
           v-for="(room, i) in rooms" :key="JSON.stringify(room)"
           @drop="(e) => onElementDrop(e, i)"
           @dragenter.prevent
           @dragover.prevent
      >
        <span>{{room.name}}</span>
        <div
            class="timetable__table__cell__session"
            :class="{'--editing': currentMode === mode.EDIT }"
            v-for="(session, index) in room.schedule"
            :key="JSON.stringify(session)"
            :id="'room-' + i + '--session-' + index"
            draggable
            @dragstart="(e) => onElementDrag(e, i, index)"
            @click="onLessonSelected(session)"
            :style="
            [{
              'left' : `${getBeginning(session)}%`
            },
            {
              'width': `${getDuration(session)}%`
            }
            ]">
          <span v-if="isNow(session.startTime, session.endTime)"
                class="timetable__table__cell__session__group_color"></span>
          <span class="timetable__table__cell__session__group_info"><strong>{{ session.group.name }}</strong></span>
        </div>
      </div>
    </div>

    <div v-else class="timetable__loading">
      <div class="loader"></div>
    </div>
    <!-- END | Timetable -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import Datepicker from 'vuejs-datepicker'
import moment, { Moment } from 'moment'

import { Group, Room } from '@/shared/models'
import { SIconButton } from '../IconButton/IconButton.vue'

import {
  AnyTime,
  Hour, Schedule, Timetable,
  TimetableMode
} from './Timetable.contracts'

/**
 * Component capable to render given rooms with schedule in Timeline format
 *
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component<STimetable>({
  name: 'STimetable',
  components: {
    Datepicker,
    SIconButton
  },

  mounted (): void {
    this.generateTimeline()
  },
})
export class STimetable extends Vue {
  /**
   * Array of rooms
   */
  @Prop({ type: Array, required: false, default: () => [] })
  public rooms!: Timetable[]

  @Prop({ type: Boolean, required: true })
  public readonly loading!: boolean

  /**
   * Reference to timeline HTMLElement
   */
  @Ref('timeline')
  public readonly _timeline!: HTMLElement

  /**
   * Modes of Timetable
   */
  public readonly mode = TimetableMode

  /**
   * Determines current mode of timetable
   */
  public currentMode: TimetableMode = TimetableMode.PREVIEW

  /**
   * Current date object
   */
  public date = moment()

  /**
   * Array of hours
   *
   * Use this to define beginning and ending of timeline
   */
  public hours : Hour[] = []

  /**
   * Overlapping sessions
   */
  public overlaps: Timetable[] = []

  /**
   * Instance of moment.js
   */
  public moment = moment()

  /**
   * Gets formatted Date from `moment`
   */
  public get formattedDate (): string {
    return this.date.format('DD MMM')
  }

  /**
   * Checks whether event is occuring now
   */
  public isNow (start: string, end: string): boolean {
    return moment().isBetween(moment(start, 'DD-MM-YYYY HH:mm'), moment(end, 'DD-MM-YYYY HH:mm'))
  }

  /**
   * Calculates offset from left
   */
  public getBeginning(session: Schedule): number {
    const startTimeInMinutes = STimetable.toMinutes(moment(session.startTime, 'DD-MM-YYYY HH:mm'))
    return (((startTimeInMinutes - this.hours[0].value) / ((this.hours[this.hours.length -1].value) - this.hours[0].value)) * 100)
  }

  /**
   * Calculates width of session
   */
  public getDuration(session: Schedule): number {
    return (((STimetable.toMinutes(moment(session.endTime, 'DD-MM-YYYY HH:mm')) -
        STimetable.toMinutes(moment(session.startTime, 'DD-MM-YYYY HH:mm'))) /
        ((this.hours[this.hours.length -1].value) - this.hours[0].value)) * 100)
  }

  // public get roomHeight (): string {
  //   if (this.rooms.length > 0) {
  //     for (let i = 0; i < this.rooms.length; i++) {
  //       for (let j = 0; j < this.rooms[i].schedule.length; j++) {
  //         const res = this.checkIfOverlaps(this.rooms[i].schedule[j], j, this.rooms[i])
  //         if (res) {
  //           this.overlaps.push(this.rooms[i].schedule[j])
  //         }
  //       }
  //     }
  //   }
  //   const height = this.overlaps.length > 0 ? (this.overlaps.length + 1) * 3 : 3
  //   return `${height}rem`;
  // }

  public groupTop (index: number): string {
    const height = (index + 1) * 50
    return `${height}px`;
  }

  // public checkIfOverlaps (session: Schedule, index: number, room: Room): boolean {
  //   if (room.schedule.length === index + 1) {
  //     return false
  //   }
  //   const isOverlapping = (moment(session.startTime).isSame(room.schedule[index + 1].startTime) || !moment(room.schedule[index + 1].startTime).isAfter(session.endTime))
  //
  //   return isOverlapping
  // }

  /**
   * On Drop session
   *
   * @param evt
   * @param roomId
   */
  public onElementDrop (evt: DragEvent, roomId: number) {
    /**
     * Get information from dataTransfer
     */
    const json = evt.dataTransfer!.getData('text/plain')

    /**
     * Parse JSON
     */
    const data = JSON.parse(json)

    /**
     * To get width of parent use reference to timeline HTML Element
     * Take width with .getBoundingRect()
     */
    const parentWidth = this._timeline.getBoundingClientRect().width

    /**
     * Calculate offset from parent in percentage
     */
    const offsetFromParent = ((evt.clientX  - data.mouseOffset) / parentWidth) * 100

    /**
     * Calculate how many minutes between starting time till the end
     */
    const overallMinutes = (this.hours[this.hours.length - 1].value) - this.hours[0].value

    // Find offset from parent to current child's x position in percentage
    const phi = (overallMinutes * offsetFromParent) / 100

    // New Time in minutes
    const newTime = this.hours[0].value + phi

    /**
     * Convert NewTime to time
     */
    const duration = STimetable.toTime(newTime)

    /**
     * Update current array with new element and new time
     */
    // this.rooms[roomId].schedule.push({
    //   startTime:
    //       new Date(2021,9, 20, duration.hours,duration.minutes).toISOString(),
    //   endTime:
    //       new Date(2021,9, 20, duration.hours+2,duration.minutes).toISOString(),
    //   group: {} as Group
    // })

    /**
     * Update the current array by removing element that has been moved out
     */
    this.rooms[data.roomId].schedule.splice(Number(data.sessionId), 1)
  }

  public onElementDrag (evt: DragEvent, roomId: number,  sessionId: number) {

    /**
     * Check if current mode is allowing us to drag session if not , return !
     */
    if (this.currentMode === TimetableMode.PREVIEW) {
      return
    }

    /**
     * Set basic configuration for dataTransfer object of DragEvent
     */
    evt.dataTransfer!.dropEffect = 'move'
    evt.dataTransfer!.effectAllowed = 'move'
    evt.dataTransfer!.setData('text/plain', 'a')

    /**
     * Catch current mouseOffset inside selected session
     * Offset from the beginning of selected element
     */
    const mouseOffset = evt.pageX - (evt.currentTarget as HTMLElement).offsetLeft

    /**
     * Set information to dataTransfer object
     */
    evt.dataTransfer!.setData('text/plain', JSON.stringify({ roomId , sessionId, mouseOffset }))

  }

  /**
   * Selects current groups lesson and emits to parent
   */
  public onLessonSelected (lesson: Schedule): void {
    this.$emit('onLessonSelected', lesson)
  }

  /**
   * Emits when  date is changed
   */
  public onDateChanged (): void {
    this.$emit('onDateChanged', this.date)
  }

  /**
   * Selects next day
   */
  public nextDay (): void {
    this.date.add(1, 'day')
    this.onDateChanged()
  }

  /**
   * Selects previous day
   */
  public prevDay (): void {
    this.date.subtract(1, 'day')
    this.onDateChanged()
  }

  /**
   * Selects any date from DatePicker
   */
  public anyDay(): void {
    this.onDateChanged()
  }

  /**
   * Swith between modes
   */
  public switchMode (): void {
    if (this.currentMode === TimetableMode.EDIT) {
      this.currentMode = TimetableMode.PREVIEW
    } else {
      this.currentMode = TimetableMode.EDIT
    }
  }

  private generateTimeline (): void {
    let _arr = []
    for (let i = 8; i <= 20; i++){
      let mom = moment({h: i})
      _arr.push(mom)
    }

    this.hours = [..._arr].map((time: Moment) => {
      return {
        key: time.hour(),
        value: STimetable.toMinutes(time)
      }
    })
  }

  /**
   * Function that converts Moment to minutes
   *
   * @param time
   * @private
   */
  private static toMinutes(time: moment.Moment) : number {
    return time.hour() * 60 + time.minute()
  }

  /**
   * Function that converts minutes to AnyTime
   *
   * @see AnyTime
   *
   * @param minutes
   * @private
   */
  private static toTime(minutes: number): AnyTime {

    const hours = (minutes / 60)

    const rhours = Math.floor(hours);
    const _minutes = (hours - rhours) * 60;
    const rminutes = Math.round(_minutes);

    return {
      hours: rhours,
      minutes: rminutes
    }
  }
}
export default STimetable
</script>
