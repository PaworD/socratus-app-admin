<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <h1>Information</h1>
      <div class="dashboard__inner__atoms">
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
      <button @click="openModal">Click to Open</button>
      <div class="dashboard__inner__timetable">
        <STimetable/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {SCard} from "@/shared/components/Card";
import {STimetable} from "@/shared/components/Timetable";
import {ModalSize} from "@/shared/abstract";
import { AppModals } from "@/shared/models/modals";

@Component({name: 'Dashboard', components: { SCard, STimetable }})
export class Dashboard extends Vue {

  public async openModal (): void {
    const modalResult = await this.$modalService.open(AppModals.createStudent, {data: 'Hello'}, {size: ModalSize.Small, hasHeader: true, persistent: true})
    console.log(modalResult)
  }
}
export default Dashboard
</script>

<style lang="scss" scoped>

</style>