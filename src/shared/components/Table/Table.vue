<template>
  <div>
    <div v-if="isLoading">
      <SSkeleton type="table" :columnsCount="4" :rowsCount="3"/>
    </div>
    <div v-else>
      <table class="table">
        <thead>
        <tr>
          <th v-for="column in _columns" :key="column" :class="{'--short' : column.toLowerCase() === 'actions'}">
            {{column}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in _rows" :key="row['id']">
          <td v-for="column in _columns" :key="column">
            <span v-if="typeof row[column] !== 'string' && typeof row[column] !== 'number'">
              <div v-for="action in row.actions" :key="JSON.stringify(action)">
                <component :is="action.component" v-bind="{row, actions: action}" />
              </div>
            </span>
            <span v-else>
              {{ row[column] }}
            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="paginate" class="table__pagination">
      <div class="table__pagination__info">
        <span>Overall: <strong> {{ totalCount }} </strong> </span>
      </div>
      <div class="table__pagination__controllers">

        <div class="table__pagination__controllers__page_size">
          <SRadio label="2"  :model="pageSize" value="2"  @changed="setPageSize" />
          <SRadio label="5"  :model="pageSize" value="5" @changed="setPageSize" />
          <SRadio label="10" :model="pageSize" value="10" @changed="setPageSize" />
        </div>

        <button :disabled="currentPage === 1" @click="prevPage">
            <i class="bi-chevron-bar-left"></i>
        </button>
        <div class="counter">
          {{ currentPage }} / {{ pages }}
        </div>
        <button :disabled="currentPage === pages" @click="nextPage">
            <i class="bi-chevron-bar-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import { AnyObject } from '@/shared/models'

import { TableRowItem } from "../Table/_"

import { SRadio } from '../RadioButton'
import { SSkeleton } from "../Skeleton"

@Component<STable>({
  name: 'STable',
  components: {
    SSkeleton,
    SRadio
  }
})
export class STable extends Vue {
  @Prop({ type: Array, required: true })
  private rows!: TableRowItem[]

  @Prop({ type: Boolean, required: false, default: false })
  public readonly isLoading!: boolean

  @Prop({ type: String, required: false, default: '' })
  private readonly searchQuery!: string

  @Prop({ type: Boolean, required: false, default: false })
  public readonly paginate!: boolean

  @Prop({ type: Number, required: false, default: 0 })
  public readonly totalCount!: number

  @Prop({ type: String, required: true })
  private readonly routeName!: string

  public get currentPage (): number {
    if (Object.prototype.hasOwnProperty.call(this.qParams, 'page')) {
      return parseInt(this.qParams.page as string, 10)
    }
    return 1
  }

  public set currentPage (page: number) {
    this.qParams = {
      ...this.qParams,
      page: page.toString()
    }
  }

  public get _rows (): TableRowItem[] {
    return this.rows
  }

  public get _columns (): string[] {
    if(this._rows.length == 0) {
      return []
    }

    return Object.keys(this._rows[0])
  }

  public get hasAction (): boolean {
    return this._rows[0].actions !== []
  }

  public get pages (): number {
    return Math.ceil(this.totalCount / this.totalPages)
  }

  public get totalPages (): number {
    return this.qParams.page_size ?? 10
  }

  public get qParams (): AnyObject {
    return this.$route.query
  }

  public set qParams (params: AnyObject) {
    this.$router.push({
      name: this.routeName,
      query: { ...params }
    })
  }

  public get pageSize (): string {
    return this.qParams.page_size ?? 10
  }

  public set pageSize (size: string) {
    this.qParams = {
      ...this.qParams,
      page_size: size.toString()
    }
  }

  public setPageSize (value: string): void {
    this.pageSize = value
  }

  public nextPage (): void {
    if (this.currentPage === this.pages) {
      return
    } else {
      this.qParams = {
        ...this.qParams,
        page: this.currentPage + 1
      }
    }
  }

  public prevPage (): void {
    this.qParams = {
      ...this.qParams,
      page: this.currentPage - 1
    }
  }

  @Watch('searchQuery')
  onSearchQuery (q: string): void {
    this.rows = this.rows.filter(obj => Object.keys(obj).some(key => String(obj[key]).includes(q)));
  }
}
export default STable
</script>