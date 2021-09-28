<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { AnyObject } from "../../shared/models";
/**
 * Modal Wrapper that every ModalComponent/View should derive
 *
 * [WARNING] Declarations that are defined here **SHOULD NOT** be overridden
 * Those variables are part of ModalService class and available just for usage
 *
 * ANY kinds of manipulations with these variables might cause errors
 *
 * @author Javlon Khalimjonov <khalimjanov.code2000@gmail.com>
 */
@Component<ModalWrapper>({name: 'ModalWrapper'})
export class ModalWrapper extends Vue {
  /**
   * Function that will be returned to parent VueConstructor on modal destroy
   *
   * @protected
   */
  protected closeModal!: (data: any) => void
  /**
   * Payload that received from parent to modal window
   *
   * @protected
   */
  protected modalData!: AnyObject

}
export default ModalWrapper
</script>