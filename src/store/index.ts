import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from "./types";
import { AdminModule } from "@/store/modules/admin.module";
import { RootModule } from "@/store/modules/root.module";

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0-beta.1',
    auth: false
  },
  modules: {
    RootModule,
    AdminModule
  }

}

export default new Vuex.Store<RootState>(store)