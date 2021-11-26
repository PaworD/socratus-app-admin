<template>
  <div class="groups__cards">
    <SCard :body-class="'groups__cards__card__body'" :footer-class="'groups__cards__card__footer'" borderless>
      <template v-slot:body>
          <div>
            <SAvatar :source="[teacher]"/>
            <p>{{ group.name }}</p>
          </div>
          <div>
            <SIconButton borderless @onClick="$router.push(`groups/${group.id}`)">
              <template v-slot:icon>
                <i class="bi-eye"></i>
              </template>
            </SIconButton>
            <SIconButton borderless @onClick="onDelete">
              <template v-slot:icon>
                <i class="bi-trash"></i>
              </template>
            </SIconButton>
          </div>
      </template>
      <template v-slot:footer>
        <span>Students: </span>
        <SAvatar v-if="students.length > 0" :source="students"/>
        <span v-else>0</span>
      </template>
    </SCard>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import { SAvatar, SCard, SIconButton  } from "@/shared/components";
import { Group } from "@/shared/models";
import { Action } from 'vuex-class'

@Component<GroupCard>({
  name: 'GroupCard',
  components: {
    SCard,
    SAvatar,
    SIconButton
  }
})
export class GroupCard extends Vue {
  @Prop({type: Object, required: true})
  public readonly group!: Group


  @Action
  private deleteGroup!: (id: number) => void

  public get students (): string[] {
    return [...this.group.students.map((student) => {
      return student.firstName + ' ' + student.lastName
    })]
  }

  public get teacher (): string {
    if (typeof this.group.teacher !== 'number') {
      return this.group.teacher.firstName + ' ' + this.group.teacher.lastName
    }

    return ''
  }

  public async onDelete (): Promise<void> {
    await this.deleteGroup(this.group.id)
  }
}
export default GroupCard
</script>

<style lang="scss" scoped>

</style>