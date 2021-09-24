<template>
  <div class="timetable">
    <div class="timetable__timeline">
      <span v-for="hour in hours" :key="hour.key" :hour="'30'">
        {{hour.key}}
      </span>
    </div>

    <div class="timetable__table">
      <div class="timetable__table__cell" v-for="lesson in sessions" :key="lesson.courseName">
        <div
            class="timetable__table__cell__session"
            v-for="session in lesson.courseSessions"
            :key="session.endTime"
            :style="
            [{
              'left' : `${getBeginning(session)}%`
            },
            {
              'width': `${getDuration(session)}%`
            }]
"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import {CourseSession, Timetable, Hour} from "./Timetable.contracts";
import moment, {Moment} from "moment";

@Component({name: 'STimetable'})
export class STimetable extends Vue {

@Prop({type: Array, required: false, default: ()=> []})
public readonly sessions!: Timetable[]

  public hours : Hour[] = []

  private static toMinutes(time: Moment) : number {
    return time.hour() * 60 + time.minute()
  }

  public getBeginning(session: CourseSession): number {
    const startTimeInMinutes = STimetable.toMinutes(moment(session.startTime))
    return (((startTimeInMinutes - this.hours[0].value) / (this.hours[this.hours.length -1].value + 60 - this.hours[0].value)) * 100)
  }

  public getDuration(session: CourseSession): number {
    return (((STimetable.toMinutes(moment(session.endTime)) - STimetable.toMinutes(moment(session.startTime))) / (this.hours[this.hours.length -1].value + 60 - this.hours[0].value)) * 100)
  }

  private generateTimeline (): void {
    let _arr = []
    for (let i = 8; i <= 19; i++){
      let mom = moment({h: i})
      _arr.push(mom)
    }

    this.hours = [..._arr].map((time: Moment) => {
      return {
        key: time.hour(),
        value: STimetable.toMinutes(time)
      }
    })

    console.log(this.hours)

  }

  created (): void {
    this.generateTimeline()
  }

}
export default STimetable
</script>