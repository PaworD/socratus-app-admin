<template>
  <div class="groups__cards">
    <SCard :body-class="'groups__cards__card__body'" :footer-class="'groups__cards__card__footer'" borderless>
      <template v-slot:body>
          <div>
            <SAvatar :source="[group.teacher]"/>
            <p>{{ group.name }}</p>
          </div>
          <div>
            <SIconButton borderless @onClick="$router.push(`groups/${group.id}`)">
              <template v-slot:icon>
                <i class="bi-eye"></i>
              </template>
            </SIconButton>
            <SIconButton borderless>
              <template v-slot:icon>
                <i class="bi-three-dots"></i>
              </template>
            </SIconButton>
          </div>
      </template>
      <template v-slot:footer>
        <span>Students: </span>
        <SAvatar :source="['John Doe', 'John Doe', 'John Doe', 'John Doe', 'John Doe']"/>
      </template>
    </SCard>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import { SAvatar, SCard, SIconButton  } from "@/shared/components";
import { Group } from "@/shared/models";

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
}
export default GroupCard
</script>

<style lang="scss" scoped>

</style>