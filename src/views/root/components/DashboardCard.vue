<template>
  <div class="Dashboard__Cart">
    <div class="Dashboard__Cart__image">
      <img src="@/assets/quiz-builder-icon.jpeg" alt="Dashboard cart item image.">
    </div>
    <div class="Dashboard__Cart__info">
      <h4> {{ title }}</h4>
      <small> {{ description }} </small>

      <router-link to="addons/quizzes" class="Dashboard__Cart__info__link">Learn More</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { SIconButton } from '@/shared/components'

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
@Component({
  name: 'DashboardCard',
  components: {
    SIconButton
  }
})
export class DashboardCard extends Vue {
  @Prop({ type: String, required: false, default: undefined })
  public readonly title!: string | undefined

  @Prop({ type: String, required: true })
  public readonly description!: string

  /**
   * Checks whether card has title
   */
  public get hasTitle (): boolean {
    return typeof this.title !== 'undefined'
  }
}
export default DashboardCard
</script>

<style lang="scss" scoped>
.Dashboard__Cart {
  width: 100%;
  height: 100%;

  max-width: 400px;

  border-radius: 10px;

  box-shadow: 0 0 10px 5px $light;

  padding: 1rem;

  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;

  &__image {
    width: 100px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
    }

    border-right: 1px solid gray;
  }

  &__info {
    display: flex;
    justify-content: center;
    flex-flow: column;
    gap: .6rem;
    padding: 0 1rem;

    &__link {
      text-decoration: none;
      color: $dark;
      font-size: .8rem;

      border: 1px solid $dark-500;
      border-radius: 6px;

      padding: .3rem;

      width: auto;

      text-align: center;
    }

    small {
      color: gray;
    }
  }
}
</style>