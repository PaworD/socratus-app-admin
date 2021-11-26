<template>
  <div class="accordion">
    <div :class="['accordion__header', {'active' : scrolled}]" v-on:click="toggle">
      <slot name="header"></slot>
      <span class="accordion__header__icon" v-bind:class="{ accordion__header__icon__rotate :
      scrolled }">+</span>
    </div>
    <transition name="accordion"
                v-on:before-enter="beforeEnter" v-on:enter="enter"
                v-on:before-leave="beforeLeave" v-on:leave="leave">
      <div class="accordion__body" v-show="scrolled">
        <div class="accordion__body__inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
// Socratus Core 2021

import { Vue, Component, Prop } from "vue-property-decorator";

import { AccordionType } from './Accordion.contracts'

/**
 * @author Javlon Khalimjonov <khalimajonov.code@gmail.com>
 */
@Component({ name: 'SAccordion' })
export class SAccordion extends Vue {
  @Prop({ type: String, required: false, default: AccordionType.Simple })
  public readonly type!: string
  
  public scrolled = false

  public toggle (): void {
    this.scrolled = !this.scrolled
  }

  /**
   * Animation based methods
   */
  public beforeEnter(el: HTMLElement): void {
    el.style.height = '0'
  }

  /**
   * Animation based methods
   */
  public enter(el: HTMLElement): void {
    el.style.height = el.scrollHeight + 'px'
  }

  /**
   * Animation based methods
   */
  public beforeLeave(el: HTMLElement): void {
    el.style.height = el.scrollHeight + 'px'
  }

  /**
   * Animation based methods
   */
  public leave(el: HTMLElement): void {
    el.style.height = '0'
  }

}
export default SAccordion
</script>

<style lang="scss">

</style>