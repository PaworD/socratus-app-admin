<template>
  <div class="home">

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import {Inject} from "inversify-props";

import {StudentService} from "@/services";

import ModalTest from '@/views/ModalTest.vue'
import {ModalSize} from "@/shared/abstract";
import {AuthView} from '@/views/auth/views/AuthView.vue'


@Component<Home>({
  components: {
    AuthView,
  },

  mounted(): void {
    this.getStudent()
  }
})
export class Home extends Vue {
  @Inject()
  private studentService!: StudentService



  private async getStudent(): Promise<void> {
     await this.studentService.get()
  }

  public async open(): Promise<any> {
    const response = await this.$modalService.open(ModalTest, {data: '123'}, {size: ModalSize.Small, persistent: false})
    console.log(response)
  }
}
export default Home
</script>
