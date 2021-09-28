<template>
  <div class="authorization__card">
    <h1>Socratus</h1>
    <STextInput placeholder="Email" size="normal" v-model="payload.phone"/>
    <STextInput placeholder="Password" type="password" size="normal" v-model="payload.password"/>
    <SDropdown :list="schoolsList" :value="selectedSchool" type="simple" @on-select="selectSchool"/>
    <span v-if="signInError">{{signInError}}</span>
    <SButton v-ripple label="Sign In" flat theme="secondary" @onClick="signIn"/>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import { STextInput } from "@/shared/components/TextInput/TextInput.vue";
import { SButton } from "@/shared/components/Button";
import {SDropdown} from "@/shared/components/Dropdown";
import {DropdownItemProps} from "@/shared/components/Dropdown/DropdownItem";
import {Admin, AnyObject, School} from "@/shared/models";
import {Action, Getter} from "vuex-class";

@Component<AuthCard>({
  name: 'AuthCard',
  components: {
    STextInput,
    SButton,
    SDropdown
  },

  mounted(): void {
    this.fetchSchoolSet()
  }
})
export class AuthCard extends Vue {
  @Action
  public fetchSchoolSet!: () => Promise<void>

  @Action
  public signInWith!: (payload: AnyObject) => Promise<Admin | void>

  @Getter
  public schools!: School[]

  @Getter
  public signInError!: string

  public errorMessage: string | null = null

  public selectedSchool = 'Select school'

  public payload : {phone: string; password: string, tenant: string} = {
    phone: '+998903001105',
    password: 'Hello0909',
    tenant: 'pantera_1'
  }

  public get schoolsList(): DropdownItemProps[] {
    if (this.schools) {
      return [...this.schools].map((school) => {
        return {
          label: school.name!,
          value: String(school.id)
        }
      })
    } else {
      return []
    }
  }

  public selectSchool (value: string): void {
    console.log(value)
  }

  public async signIn (): void {
    if (!this.payload) {
      return
    }
    this.errorMessage = null
    await this.signInWith(this.payload)
  }
}
export default AuthCard
</script>

<style lang="scss" scoped>

</style>