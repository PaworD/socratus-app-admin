<template>
  <div id="app">
    <AuthView/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { AuthView } from "@/views/auth/views/AuthView.vue";

@Component({
  name: 'App',
  components: {
    AuthView
  }
})
export class App extends Vue {

}
export default App
</script>
<style lang="scss">
* {
  //
}
</style>
