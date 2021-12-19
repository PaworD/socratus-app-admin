<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <h1>Information</h1>
      <div class="dashboard__inner__atoms">
        <SCard>
          <template v-slot:body>
            Some body Text
          </template>
        </SCard>
        <SCard>
          <template v-slot:header>
            Some Header
          </template>
          <template v-slot:body>
            Some body Text
          </template>
        </SCard>
        <SCard>
          <template v-slot:header>
            Some Header
          </template>
          <template v-slot:body>
            Some body Text
          </template>
        </SCard>
      </div>
      <h1>Timetable</h1>
      <div class="dashboard__inner__timetable">
        <STimetable :rooms="timetable"
                    @onDateChanged="onDateChanged"
                    @onLessonSelected="onLessonSelected" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Action, Getter } from 'vuex-class'
import { Component, Vue } from "vue-property-decorator";
import moment from 'moment'


import { ModalSize } from "@/shared/abstract";
import { SCard } from "@/shared/components/Card";
import { Schedule, STimetable, Timetable } from '@/shared/components/Timetable'

@Component<Dashboard>({
  name: 'Dashboard',
  components: { SCard, STimetable },

  mounted(): void {
    this.fetchTimetable()
  }
})
export class Dashboard extends Vue {

  @Action
  public readonly fetchTimetable!: (date?: string) => Promise<void>

  @Getter
  public readonly timetable!: Timetable[]

  public onDateChanged (date: string): void {
   const formattedDate = moment(date).format('DD-MM-yyyy')
    this.fetchTimetable(formattedDate)
    console.log(this.timetable)
  }

  public onLessonSelected (lesson: Schedule): void {
    //
  }

}
export default Dashboard
</script>

<style lang="scss" scoped>

</style>