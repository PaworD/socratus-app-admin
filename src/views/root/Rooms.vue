<template>
  <div class="rooms">
    <div class="rooms__room" v-for="room in editableRooms" :key="room.id">
      <span v-if="!room.isEditing">{{ room.name }}</span>
      <STextInput v-else flat size="small" type="text" v-model="room.name" />
      <div class="actions">
        <SIconButton @onClick="() => openUpdateRoomModal(room)" borderless>
          <template v-slot:icon>
            <i class="bi-pencil"></i>
          </template>
        </SIconButton>
        <SIconButton @onClick="() => removeRoom(room.id)" borderless>
          <template v-slot:icon>
            <i class="bi-trash"></i>
          </template>
        </SIconButton>
      </div>
    </div>
    <SButton size="small" flat theme="secondary" label="Add Room" @onClick="openCreateRoomModal" />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import { Room } from '@/shared/models'
import { SButton, SIconButton, STextInput } from '@/shared/components'

import { CreateRoomModal } from './modals/CreateRoomModal.vue'
import { ModalSize } from '@/shared/abstract'

@Component<Rooms>({
  name: "RoomsView",
  components: {
    SIconButton,
    SButton,
    STextInput
  },

  mounted (): void {
    this.fetchRooms()
  }
})
export class Rooms extends Vue {

  @Action
  public fetchRooms!: () => Promise<void>

  @Action
  public deleteRoom!: (id: number) => Promise<string>

  @Getter
  public rooms!: Room[]

  public get editableRooms (): Room[] {
    return this.rooms.map((room) => {
      return {
        ...room,
        isEditing: false
      }
    })
  }

  public openCreateRoomModal (): void {
    this.$modalService.open(CreateRoomModal,
        {},
        {
          hasHeader: true,
          headerText: "Create Room",
          size: ModalSize.ExtraSmall,
          persistent: true
        }
    ).then(() => {
      this.fetchRooms()
    })
  }

  public openUpdateRoomModal (room: Room): void {
    this.$modalService.open(CreateRoomModal,
        {
          id: room.id,
          room: {
            name: room.name,
            color: room.color
          }
        },
        {
          hasHeader: true,
          headerText: "Create Room",
          size: ModalSize.ExtraSmall,
          persistent: true
        }
    ).then(() => {
      this.fetchRooms()
    })
  }

  /**
   * Start editing given room
   * @param roomId
   */
  public startEdit (roomId: number): void {
    this.editableRooms.filter((room) => room.id === roomId)[0].isEditing = true
  }

  public stopEdit (id: number): void {
    this.editableRooms.filter((room) => room.id === id)[0].isEditing = true
  }

  /**
   * Delete room
   * @param id
   */
  public removeRoom(id: number): void {
    this.deleteRoom(id).then(() => {
      this.editableRooms.filter(room => room.id !== id)
    })
  }

}
export default Rooms
</script>
<style lang="scss" scoped></style>