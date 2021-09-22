<template>
  <div class="authorization__card">
    <h1>Socratus</h1>
    <STextInput placeholder="Email" size="normal"/>
    <STextInput placeholder="Password" type="password" size="normal"/>
    <SButton v-ripple label="Sign In" flat theme="secondary"/>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { SButton } from "@/shared/components/Button";

@Component({
  name: 'Auth Card',
  components: {
    STextInput,
    SButton
  }
})
export class AuthCard extends Vue {

}
export default AuthCard
</script>

<style lang="scss" scoped>

</style>