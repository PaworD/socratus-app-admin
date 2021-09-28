<template>
  <div class="authorization">
    <div class="authorization__left">
      <img src="@/assets/auth/side-bg.svg" alt="Left Side Image">
    </div>
    <div class="authorization__right">
        <AuthCard/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthCard } from "../components/AuthCard";

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */

@Component({name: 'AuthView',
  components: {
    AuthCard
  },
})
export class AuthView extends Vue {

}
export default AuthView
</script>

<style lang="scss" scoped>

</style>