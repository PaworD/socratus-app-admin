<template>
  <div class="students">
    <div class="students__lead">
      <h2>Teachers</h2>
      <div class="students__lead__options">
        <STextInput size="small" placeholder="Search..." type="text" v-model="searchQuery" withRadius />
        <SIconButton @onClick="openCreateTeacherModal">
          <template v-slot:icon>
            <i class="bi-plus-circle"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <div class="students__list">
      <STable :rows="rows"
              :searchQuery="searchQuery"
              :isLoading="isLoading"
              :routeName="'TeachersView'"
              :paginate="true"
              :totalCount="totalCount"

      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from "vuex-class";

import { AnyObject, Pageable, Teacher } from '@/shared/models'
import { ModalSize } from "@/shared/abstract";
import { TableRowItem } from "@/shared/components/Table/_";
import { STable, STextInput, SIconButton } from "@/shared/components";

import { CreateTeacherModal } from './modals'
import { TeacherActions } from "./components/actions";

/**
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
@Component<TeachersView>({
  name: 'TeachersView',
  components: {
    STable,
    SIconButton,
    STextInput
  },

  mounted(): void {
    this.getTeachers(this.queryParams)
  }
})
export class TeachersView extends Vue {
  @Action
  private fetchTeachers!: (q?: AnyObject) => Promise<Pageable>

  @Getter
  private teachers!: Teacher[]

  public searchQuery = ''

  public isLoading = false

  public totalCount = 0

  public get queryParams (): AnyObject {
    return this.$route.query
  }

  public get rows(): TableRowItem[] {
    return this.teachers.map(teacher => {
      return {
        id: teacher.id,
        fullName: `${teacher.firstName} ${teacher.lastName}`,
        phone: teacher.phone,
        email: teacher.email ?? '(not set)',
        actions: [
          {
            component: TeacherActions,
            onDelete: this.fetchTeachers
          }
        ]
      }
    })
  }

  public async openCreateTeacherModal (): Promise<void> {
    await this.$modalService.open(CreateTeacherModal, {}, {
      hasHeader: true,
      size: ModalSize.ExtraSmall,
      persistent: false,
      headerText: 'Create Teacher'
    }).then(() => {
      this.fetchTeachers()
    })
  }

  public getTeachers (query?: AnyObject): void {
    this.isLoading = true
    this.fetchTeachers(query).then((meta: Pageable) => {
      this.totalCount = meta.totalCount
      this.isLoading = false
    })
  }

  @Watch('queryParams')
  onQueryParamsChanged (query: AnyObject): void {
    this.getTeachers(query)
  }
}
export default TeachersView

</script>

<style lang="scss" scoped>

</style>