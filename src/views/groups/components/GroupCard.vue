<template>
  <div class="groups__cards">
    <SCard :body-class="'groups__cards__card__body'" :footer-class="'groups__cards__card__footer'" borderless>
      <template v-slot:body>
        <div class="groups__cards__card__body__color" :style="{ 'backgroundColor': group.color }"></div>
        <div class="groups__cards__card__body__header">
          <div>
            <SAvatar :source="[teacher]"/>
          </div>
          <div>
            <SIconButton borderless @onClick="$router.push(`groups/${group.id}`)">
              <template v-slot:icon>
                <i class="bi-eye"></i>
              </template>
            </SIconButton>
            <SIconButton borderless @onClick="openUpdateGroupModal">
              <template v-slot:icon>
                <i class="bi-pencil"></i>
              </template>
            </SIconButton>
            <SIconButton borderless @onClick="onDelete">
              <template v-slot:icon>
                <i class="bi-trash"></i>
              </template>
            </SIconButton>
          </div>
        </div>
        <div class="groups__cards__card__body__content">
          <h3>{{ group.name }}</h3>
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

import { Component, Prop, Vue } from 'vue-property-decorator'

import { Group } from '@/shared/models'
import { DeleteModal } from '@/shared/modals'
import { ModalSize } from '@/shared/abstract'
import { SAvatar, SCard, SIconButton } from '@/shared/components'

import CreateGroupModal from '../modals/CreateGroupModal.vue'

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
    this.$modalService.open(DeleteModal,
        {
          id: this.group.id,
          module: 'group',
          message: `Are you sure to delete group: ${this.group.name} `
        },
        {
          hasHeader: true,
          size: ModalSize.ExtraSmall,
          persistent: false
        }).then( async () => {
            this.$emit('onGroupDelete')
        })
  }

  public openUpdateGroupModal (): void {
    this.$modalService.open(CreateGroupModal,
        {
          id: this.group.id,
          group: this.group
        },
        {
          hasHeader: true,
          headerText: 'Update Group',
          persistent: true,
          size: ModalSize.ExtraSmall
        }
    ).then(() => {
      this.$emit('onGroupUpdate')
    })
  }
}
export default GroupCard
</script>

<style lang="scss" scoped>

</style>