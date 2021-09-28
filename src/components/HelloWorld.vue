<template>
  <div class="hello">
    {{modalData}}
    <button @click="close()">Close</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalWrapper from "@/components/_abstract/ModalWrapper.vue";

@Component<HelloWorld>({name: 'HelloWorld',
  mounted(): void {
    console.log(this.modalData)
  }
})
export class HelloWorld extends ModalWrapper {
  @Prop() private msg!: string;

  public close (): void {
    this.closeModal({test: 'w'})
  }

}
export default HelloWorld
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
