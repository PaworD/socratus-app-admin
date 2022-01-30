<template>
  <div class="avatars">
    <span v-for="(name, index) in someAvatars" :key="index" class="avatar" :title="name">
      <span>{{ firstAndLast[index] }}</span>
    </span>
    <span class="avatar" v-if="source.length >= 2">
      +{{ source.length }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SAvatar',
})
export class SAvatar extends Vue {
  @Prop({type: Array, required: true})
  public readonly source!: string[]

  /**
   * Extract first and last letters from `source`
   */
  public get firstAndLast (): string[] {
    if (this.source.length > 0) {
      return this.someAvatars.map((src: string) => {
        return `${String(src).split(' ')[0][0]}${String(src).split(' ')[1][0]}`
      })
    }
    return ['']
  }

  public get someAvatars (): string[] {
    if (this.source.length > 3) {
      return this.source.splice(0, 3)
    }
    return this.source
  }

  public fullName (index: number): string {
    return this.source[index]
  }
}
export default SAvatar
</script>

<style lang="scss" scoped>

</style>