<template>
  <div>
    <PrintSheet :payment="modalData.payment" />
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'

import { ModalWrapper } from '@/components/_abstract/ModalWrapper.vue'

import { PrintSheet } from '../partials/PrintSheet.vue'

/**
 * @author Javlon Khalimjonov <khalimjanov.code@gmail.com>
 */
@Component({
  name: 'PrintModal',
  components: {
    PrintSheet
  }
})
export class PrintModal extends ModalWrapper {

}
export default PrintModal
</script>