<template>
  <div class="students">
    <div class="students__lead">
      <h2>Students</h2>
      <div class="students__lead__options">
        <STextInput size="small" placeholder="Search..." type="text" v-model="searchQuery" withRadius />
        <SIconButton @onClick="openCreateStudentModal">
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
              :routeName="'StudentsView'"
              :paginate="true"
              :totalCount="totalCount" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { STable, STextInput, SIconButton } from "@/shared/components";
import { TableRowItem } from "@/shared/components/Table/_";
import { StudentActions } from "@/views/students/components/actions";
import { Action, Getter } from "vuex-class";
import { AnyObject, Pageable, Student } from '@/shared/models'
import { CreateStudentModal } from "@/views/students/modals/CreateStudentModal.vue";
import { ModalSize } from "@/shared/abstract";

@Component<StudentsView>({
  name: 'StudentsView',

  components: {
    STable,
    SIconButton,
    STextInput
  },

  mounted(): void {
    this.getStudents(this.queryParams)
  }
})
export class StudentsView extends Vue {

  @Action
  private fetchStudents!: (query?: AnyObject) => Promise<Pageable>

  @Getter
  private students!: Student[]

  public searchQuery = ''

  public isLoading = false

  public totalCount = 0

  public get queryParams (): AnyObject {
    return this.$route.query
  }

  public get rows(): TableRowItem[] {
    return this.students.map(student => {
      return {
        id: student.id,
        fullName: `${student.firstName} ${student.lastName}`,
        phone: student.phone,
        email: student.email ?? '(not set)',
        actions: [
          {
            component: StudentActions,
            onDelete: this.fetchStudents,
            onUpdate: this.fetchStudents
          }
        ]
      }
    })
  }

  public async openCreateStudentModal (): Promise<void> {
    await this.$modalService.open(CreateStudentModal, {}, {
      hasHeader: true,
      size: ModalSize.ExtraSmall,
      persistent: false,
      headerText: 'Create Student'
    }).then(() => {
      this.fetchStudents()
    })
  }

  public getStudents (query: AnyObject = {}): void {
    this.isLoading = true
    this.fetchStudents(query).then((meta: Pageable) => {
      this.totalCount = meta.totalCount
    }).finally(() => {
      this.isLoading = false
    })
  }

  @Watch('queryParams')
  protected onQueryChanged (query: AnyObject): void {
    this.getStudents(query)
  }
}
export default StudentsView

</script>

<style lang="scss" scoped>

</style>