<template>
  <div class="global_search">
    <STextInput placeholder="Search student/teacher/group..." v-model="qString" @input="startSearchDebounced" size="small" flat/>

    <div v-if="hasRequiredChars" class="global_search__results_container">
      <div class="global_search__results_container--students">
        <h5>Students ({{ results.students.length }})</h5>

        <ul v-if="results.students && results.students.length">
          <li v-for="student in results.students" :key="student.id">
            <p>{{ student.text.split(',')[0] }}</p>
            <small v-if="student.text.split(',').length > 0">{{ student.text.split(',')[1] }}</small>
            <small v-if="student.text.split(',').length > 1">{{ student.text.split(',')[2] }}</small>
          </li>
        </ul>

        <span v-else> (No students found ) </span>
      </div>
      <div class="global_search__results_container--teachers">
        <h5>Teachers ({{ results.teachers.length }})</h5>

        <ul v-if="results.teachers && results.teachers.length">
          <li v-for="teacher in results.teachers" :key="teacher.id">
            <p>{{ teacher.text.split(',')[0] }}</p>
            <small v-if="teacher.text.split(',').length > 0">{{ teacher.text.split(',')[1] }}</small>
            <small v-if="teacher.text.split(',').length > 1">{{ teacher.text.split(',')[2] }}</small>
          </li>
        </ul>

        <span v-else> (No teachers found ) </span>
      </div>
      <div class="global_search__results_container--groups">
        <h5>Groups ({{ results.groups.length }})</h5>

        <ul v-if="results.groups && results.groups.length">
          <li v-for="group in results.groups" :key="group.id">
            <p>{{ group.text.split(',')[0] }}</p>
            <small v-if="group.text.split(',').length > 0">{{ group.text.split(',')[1] }}</small>
            <small v-if="group.text.split(',').length > 1">{{ group.text.split(',')[2] }}</small>
          </li>
        </ul>

        <span v-else> (No groups found ) </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import _ from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import { AnyObject, GlobalSearchResults } from '../shared/models'
import { STextInput } from '@/shared/components'


/**
 * Component capable to render main SearchBar
 *
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component<GlobalSearch>({
  name: 'GlobalSearch',
  components: {
    STextInput
  }
})
export class GlobalSearch extends Vue {

  @Action
  public search!: (q: string) => Promise<GlobalSearchResults>

  /**
   * Query string that user inputs
   */
  public qString = ''

  /**
   * Search results
   */
  public results: GlobalSearchResults | null = null

  /**
   * Debounced function
   */
  public startSearchDebounced = _.debounce(this.startSearch, 500)

  /**
   * Current query params of url path
   */
  public get query (): AnyObject {
    return this.$route.query
  }

  /**
   * Determines whether query string has enough symbols to display results container
   */
  public get hasRequiredChars(): boolean {
    return this.qString.length >= 3
  }

  /**
   * Requests new `GlobalSearchResults` from API with current query string
   *
   * @see qString
   */
  public startSearch (): void {
    if (!this.hasRequiredChars) {
      return
    }

    this.search(this.qString).then((results: GlobalSearchResults) => {
      this.results = results
    })

  }
}
export default GlobalSearch
</script>