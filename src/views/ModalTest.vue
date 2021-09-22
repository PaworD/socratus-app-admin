<template>
  <div>
    {{modalData}}
  </div>
</template>

<script lang="ts">
import {Component ,Vue} from 'vue-property-decorator'

@Component<ModalTest>({
  name: "ModalTest.vue",

  mounted(): void {
    console.log(this.$el)
  }
})
export class ModalTest extends Vue {
}
export default ModalTest
</script>

<style scoped>

</style>