<template>
  <div id="app">
    <template v-if="loading">
      <transition name="fade">
        <SLoader/>
      </transition>
    </template>
    <template v-if="!authState">
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
    <div id="toast-div"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { Layout } from "@/components/Layout.vue";
import { Sidebar } from "@/components/Sidebar.vue";
import { AuthView } from "@/views/auth/views";
import {Action, Getter} from "vuex-class";
import {SLoader} from "@/shared/components/Loader";

@Component<App>({
  name: 'App',
  components: {
    AuthView,
    Layout,
    Sidebar,
    SLoader
  },

  beforeMount (): void {
    this.loading = true
    this.init().then(() => {
      this.loading = false
    })
  }
})
export class App extends Vue {

  @Action
  public init!: () => Promise<void>

  @Getter
  public authState!: boolean

  public loading = false

}
export default App
</script>
<style lang="scss" scoped>
* {
  //
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
