<template>
  <div>{{ $route.params }}</div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AddonView'
})
export class AddonView extends Vue {

}
export default AddonView
</script>