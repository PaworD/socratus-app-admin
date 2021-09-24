<template>
  <div :class="['card', `card__theme__${theme}`, {'card__borderless' : borderless}]">
    <div v-if="$slots.header" :class="['card__header', headerClass]">
      <slot name="header"></slot>
    </div>
    <div :class="['card__body', bodyClass]">
      <slot name="body"></slot>
    </div>
    <div v-if="$slots.footer" :class="['card__footer', footerClass]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CardTheme } from "./Card.contracts";

@Component<SCard>({name: 'SCard'})
export class SCard extends Vue {
  @Prop({type: Boolean, required: false, default: false})
  public readonly borderless!: boolean

  @Prop({type: String, required: false, default: CardTheme.Default})
  public readonly theme!: string

  @Prop({type: String, required: false, default: ''})
  public readonly headerClass!: string

  @Prop({type: String, required: false, default: ''})
  public readonly bodyClass!: string

  @Prop({type: String, required: false, default: ''})
  public readonly footerClass!: string

}
export default SCard
</script>

<style lang="scss">

</style>