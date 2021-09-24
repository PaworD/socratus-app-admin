<template>
  <div id="app">
    <Layout>
      <template v-slot:sidebar>
          <Sidebar/>
      </template>
      <template v-slot:content>
        <transition name="scale">
          <router-view></router-view>
        </transition>
      </template>
    </Layout>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { Layout } from "@/components/Layout.vue";
import { Sidebar } from "@/components/Sidebar.vue";

@Component({
  name: 'App',
  components: {
    Layout,
    Sidebar
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
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}


.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
