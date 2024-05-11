<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <h1>Recommended links</h1>
      <div class="dashboard__inner__atoms">
        <DashboardCard title="Quiz Builder v1.0"
                       description="Now try for free brand new quiz creator "
                       link="" />
      </div>
      <h1>Timetable</h1>
      <div class="dashboard__inner__timetable">
        <STimetable :rooms="timetable"
                    :loading="isLoading"
                    @onDateChanged="onDateChanged"
                    @onLessonSelected="onLessonSelected" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Action, Getter } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'

import { SCard } from '@/shared/components'
import { Schedule, STimetable, Timetable } from '@/shared/components/Timetable'

import DashboardCard from './components/DashboardCard.vue'

@Component<Dashboard>({
  name: 'Dashboard',
  components: { SCard, STimetable, DashboardCard },

  mounted (): void {
    this.load()
  }
})
export class Dashboard extends Vue {
  @Action
  public readonly fetchTimetable!: (date?: string) => Promise<void>

  @Getter
  public readonly timetable!: Timetable[]

  public isLoading = false

  public onDateChanged (date: string): void {
    const formattedDate = moment(date).format('DD-MM-yyyy')
    this.load(formattedDate)
  }

  public onLessonSelected (lesson: Schedule): void {
    //
  }

  public async load (date?: string): Promise<void> {
    try {
      this.isLoading = true
      await this.fetchTimetable(date)
    } finally {
      this.isLoading = false
    }
  }
}

export default Dashboard
</script>

<style lang="scss" scoped>

</style>
