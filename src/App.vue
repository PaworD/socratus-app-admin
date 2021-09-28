<template>
  <div id="app">
    <template v-if="!isLoggedIn">
      <AuthView/>
    </template>
    <Layout v-else>
      <template v-slot:sidebar>
          <Sidebar/>
      </template>
      <template v-slot:content>
          <router-view></router-view>
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { Layout } from "@/components/Layout.vue";
import { Sidebar } from "@/components/Sidebar.vue";
import { AuthView } from "@/views/auth/views";

@Component({
  name: 'App',
  components: {
    AuthView,
    Layout,
    Sidebar
  }
})
export class App extends Vue {

  public isLoggedIn = false

}
export default App
</script>
<style lang="scss">
* {
  //
}
</style>
