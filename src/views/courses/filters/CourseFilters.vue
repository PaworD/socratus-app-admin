<template>
  <transition name="fade" appear>
    <div class="filter-box">
      <div class="input-group">
        <SDropdown :list="sortByPriceOptions" :value="sortByPriceOptions[0].label" @on-select="sortByPrice" />
      </div>
      <div class="input-group">
        <SDropdown :list="sortByLevelOptions" :value="sortByLevelOptions[0].label" @on-select="sortByLevel" />
      </div>
      <div class="input-group">
        <STextInput
            size="middle"
            type="text"
            placeholder="Enter name of the course"
            v-model="courseName"
            with-radius
            flat />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">

import { Component, Watch } from 'vue-property-decorator'

import { Course } from '@/shared/models'
import { Filters } from '@/components/Filters.vue'

import {
  SIconButton,
  STextInput,
  SCheck,
  SBadge,
  SDropdown,
  DropdownItemProps
} from '@/shared/components'

import { sortByLevelOptions, sortByPriceOptions } from '../contracts/filters'

@Component<CoursesFilters>({
  name: 'CoursesFilter',
  components: {
    SIconButton,
    STextInput,
    SCheck,
    SBadge,
    SDropdown
  }
})
export class CoursesFilters extends Filters<Course> {

  public courseName = ''


  public get sortByPriceOptions (): DropdownItemProps[] {
    return [
      { label: 'Select pricing' ,value: 'none' },
      ...Object.entries(sortByPriceOptions).map(([label, value]) => {
      return {
        label,
        value
      }
    })]
  }

  public get sortByLevelOptions (): DropdownItemProps[] {
    return [
      { label: 'Select level' ,value: 'none' },
      ...Object.entries(sortByLevelOptions).map(([label, value]) => {
        return {
          label,
          value
        }
      })]
  }

  /**
   * Sort by price
   * @param option
   */
  public sortByPrice (option: DropdownItemProps): void {
    this._items = this.originalList.sort((a, b) => {
      if (option.value === sortByPriceOptions.Cheap) {
        return a.price - b.price
      } else if (option.value === sortByPriceOptions.Expensive) {
        return b.price - a.price
      } else {
        return 0
      }
    })
  }

  /**
   * Sort by course level
   * @param option
   */
  public sortByLevel (option: DropdownItemProps): void {
    this._items = this.originalList.filter((item) => {
      if (option.value === 'none' || !option.value || typeof item.level === 'undefined') {
        return item
      }
      return item.level.includes(option.value)
    })
  }

  @Watch('courseName')
  onCourseNameChanged (value: string): void {
    if (value.length === 0) {
      this._items = this.originalList
    } else {
      this._items = this.originalList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    }
  }

}
export default CoursesFilters
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>