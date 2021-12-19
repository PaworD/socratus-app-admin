<template>
  <div>
    {{ modalData.date }}
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import ModalWrapper from '@/components/_abstract/ModalWrapper.vue'

@Component({
  name: 'UpdateLessonModal'
})
export class UpdateLessonModal extends ModalWrapper {

}
export default UpdateLessonModal
</script>