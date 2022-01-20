<template>
  <div :class="['badge', `badge__${theme}`]">
    {{ title }}
    <span v-if="closable" @click="onClose">&times;</span>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { BadgeProps, BadgeTheme } from '@/shared/components/Badge/Badge.contracts'

@Component({
  name: 'SBadge'
})
export class SBadge extends Vue {
  @Prop({ type: String, required: true })
  public readonly title!: BadgeProps['title']

  @Prop( { type: String, required: false, default: BadgeTheme.Light })
  public readonly theme!: BadgeTheme

  @Prop({ type: Boolean, required: false, default: () => false })
  public closable!: boolean

  public buttonTheme = BadgeTheme

  public onClose (): void {
    this.$emit('close')
  }
}
export default SBadge
</script>