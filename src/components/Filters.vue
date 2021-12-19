<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

/**
 * Abstract Filter Component
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<Filters<any>>({
  name: 'Filters',

  mounted (): void {
    this.originalList = this._items
  }
})
export class Filters<T extends any> extends Vue {
  @PropSync('items', { type: Array, required: true })
  public _items!: T[]

  protected originalList: T[] = []

  /**
   * Resets list to initial values
   * @protected
   */
  protected clearFilters(): void {
    // TODO: Implement
  }
}
export default Filters

</script>