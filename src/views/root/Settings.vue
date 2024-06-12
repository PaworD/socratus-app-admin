<template>
  <div>
    Currency: {{ meta.currency }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from "vuex-class";

import { Meta } from "@/shared/models";

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component({
  name: 'Settings'
})
export class Settings extends Vue {
  @Getter
  public meta!: Meta
}
export default Settings
</script>
