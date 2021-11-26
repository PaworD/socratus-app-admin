<template>
  <div class="select" :data-value="val" :data-list="list">
    <div class="select--selector" @click="toggle">
      <div class="select--selector--label">
        <span>{{ val }}</span>
      </div>
      <div :class="['select--selector--arrow', { 'select--selector--expanded' : visible }]"></div>
      <div :class="{'hidden' : !visible, visible}">
        <ul>
          <SDropdownItem
              v-for="item in list"
              :key="JSON.stringify(item)"
              :label="item.label"
              :value="item.value"
              :class="{'current' : item.label === val}"
              @click="selectItem(item)" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SDropdownItem } from "../Dropdown/DropdownItem/DropdownItem.vue";
import { DropdownItemProps } from "../Dropdown/DropdownItem";

@Component({name: 'SDropdown', components: {SDropdownItem}})
export class SDropdown extends Vue {
  @Prop({type: Array, required: true })
  private readonly list!: DropdownItemProps[]

  @Prop({type: String, required: true })
  private value!: string

  @Prop( { type: Boolean, required: false, default: false })
  public multiselect!: boolean

  public visible: boolean | null = false
  public val: string = this.value

  public toggle(): void {
    this.visible = !this.visible
  }

  public selectItem(item: DropdownItemProps): void {
    if (this.multiselect) {
      this.val = this.value
    } else {
      this.val = item.label
    }
    this.$emit('on-select', item)
  }
}

export default SDropdown
</script>

<style scoped>

</style>