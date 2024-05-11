<template>
  <div class="authorization__card">
    <form @submit.prevent="signIn">
      <p class="title">Socratus</p>
      <STextInput
          placeholder="Email"
          size="normal"
          :errors="errors && errors['phone'] ? errors['phone'] : []"
          v-model="payload.phone"
      />
      <STextInput
          placeholder="Password"
          type="password"
          size="normal"
          :errors="errors && errors['password'] ? errors['password'] : []"
          v-model="payload.password"
      />

      <SDropdown
          :list="schoolsList"
          :value="selectedSchool"
          type="simple"
          :errors="errors && errors['tenant'] ? errors['tenant'] : []"
          @on-select="selectSchool" />

      <SButton label="Sign In" theme="secondary" type="submit" :isLoading="isLoading" />
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { Admin, AnyObject, School } from '@/shared/models'

import { DropdownItemProps, SButton, SDropdown, STextInput } from '@/shared/components'
import {AnyResponse} from "@/services";

@Component<AuthCard>({
  name: 'AuthCard',
  components: {
    STextInput,
    SButton,
    SDropdown
  },
  mounted (): void {
    this.fetchSchoolSet()
  }
})
export class AuthCard extends Vue {
  @Action
  public fetchSchoolSet!: (q?: AnyObject) => Promise<void>

  @Action
  public signInWith!: (payload: AnyObject) => Promise<Admin | void>

  @Action
  public init!: () => Promise<void>

  @Getter
  public schools!: School[]

  public errorMessage: string | null = null
  public selectedSchool = 'Select school'
  public isLoading = false
  public errors: Record<string, string>[] = []

  public payload: { phone: string; password: string, tenant: string } = {
    phone: '+998903001105',
    password: 'Hello0909',
    tenant: ''
  }

  public get schoolsList (): DropdownItemProps[] {
    if (this.schools) {
      return [...this.schools].map((school) => {
        return {
          label: school.name!,
          value: school.tenant!
        }
      })
    } else {
      return []
    }
  }

  public selectSchool (value: DropdownItemProps): void {
    this.payload.tenant = value.value!
  }

  public async signIn (): Promise<void> {
    if (!this.payload) {
      return
    }
    try {
      this.errorMessage = null
      this.isLoading = true
      await this.signInWith(this.payload)
      await this.init()
    } catch (e) {
      this.errors = e.payload
    } finally {
      this.isLoading = false
    }

  }
}
export default AuthCard
</script>
