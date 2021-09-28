<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <h1>Information</h1>
      <div class="dashboard__inner__atoms">
        <SCard>
          <template v-slot:header>
            <button @click="openModal">OPen</button>
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
import {Action} from "vuex-class";
import HelloWorld from "@/components/HelloWorld.vue";
import {ModalSize} from "@/shared/abstract";

@Component<Dashboard>({
  name: 'Dashboard',
  components: { SCard, STimetable },

  mounted (): void {
    this.fetchStudents()
  }
})
export class Dashboard extends Vue {

  @Action
  private fetchStudents!: () => Promise<void>


  public async openModal(): Promise<void> {
    const data = await this.$modalService.open(HelloWorld, {data: '123'}, {size: ModalSize.FullScreen, persistent: false, hasHeader: true})
    console.log(data)
  }

}
export default Dashboard
</script>

<style lang="scss" scoped>

</style>