<template>
  <div>
    <SIconButton borderless>
      <template v-slot:icon>
        <i class="bi-pen"></i>
      </template>
    </SIconButton>
    <SIconButton borderless @onClick="deleteStudent(row.id)">
      <template v-slot:icon>
        <i class="bi-trash"></i>
      </template>
    </SIconButton>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";
import {SIconButton} from "@/shared/components";
import {TableRowItem} from "@/shared/components/Table/_";
import {Action} from "vuex-class";
import {Identifier} from "@/shared/models";

@Component<StudentActions>({
  name: 'StudentActions',
  components: {
    SIconButton
  }
})
export class StudentActions extends Vue {
  @Prop({type: Object, required: true})
  public readonly row!: TableRowItem

  @Action
  public deleteStudent!: (id: Identifier) => Promise<string>

}
export default StudentActions
</script>