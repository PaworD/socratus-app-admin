<template>
  <div class="avatars">
    <span v-for="(name, index) in firstAndLast" :key="index" class="avatar">
      <span>{{name}}</span>
    </span>
    <span class="avatar" v-if="source.length >= 1">
      +{{ source.length }}
    </span>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

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
      const some = [...this.source.splice(0, 3)]
      return some.map((src: string) => {
        return `${String(src).split(' ')[0][0]}${String(src).split(' ')[1][0]}`
      })
    }
    return ['']
  }
}
export default SAvatar
</script>

<style lang="scss" scoped>

</style>