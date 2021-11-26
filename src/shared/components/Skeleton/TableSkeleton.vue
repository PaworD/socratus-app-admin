<template>
  <table class="skeleton__table">
    <tr>
      <th v-for="column in columnsCount" :key="column" class="tg-cly1">
        <div class="line"></div>
      </th>
    </tr>
    <tr v-for="row in rowsCount" :key="row">
      <td v-for="column in columnsCount" :key="column" class="tg-cly1">
        <div class="line"></div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: "TableSkeleton"
})
export class TableSkeleton extends Vue {
  @Prop({ type: Number, required: false, default: 4 })
  public readonly columnsCount!: number

  @Prop({ type: Number, required: false, default: 3 })
  public readonly rowsCount!: number
}
export default TableSkeleton
</script>
<style lang="scss" scoped></style>