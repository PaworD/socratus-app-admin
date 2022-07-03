
<template>
  <img v-if="lazy" v-lazy="{ src }" class="Image" />
  <img v-else :src="src" :alt="alt" class="Image" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ImageProps } from '@/shared/components/Image/Image.contracts'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({ name: 'SImage' })
export class SImage extends Vue {
  /**
   * @see ImageProps.alt
   */
  @Prop({ type: String, required: false, default: '' })
  public readonly alt?: ImageProps['alt']

  /**
   * @see ImageProps.lazy
   */
  @Prop({ type: Boolean, required: false, default: true })
  public readonly lazy!: ImageProps['lazy']

  /**
   * @see ImageProps.src
   */
  @Prop({ type: String, required: true })
  public readonly src!: ImageProps['src']
}
export default SImage
</script>

<style lang="scss">

.Image {
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    z-index: 10;
    top: 0;
  }

  &[lazy="loaded"] {
    opacity: 0;
    animation-name: fadein;
    animation-duration: .5s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-direction: normal;
    animation-timing-function: ease-out;

    @keyframes fadein {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>