import Vue, { VueConstructor } from "vue";

import { AbstractModalService, ModalConfigs } from "@/shared/abstract";
import { AnyObject } from "@/shared/models";
import SModalWrapper from "@/shared/components/Modal/Modal.vue";

/**
 * Type declaration for global access to $modalService
 */
declare module 'vue/types/vue' {
    interface Vue {
        $modalService: {
            open: (Modal: VueConstructor, payload: AnyObject, configs?: ModalConfigs) => Promise<AnyObject>
        }
    }
}

/**
 * Modal Service class
 *
 * @inheritDoc
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export class ModalService extends AbstractModalService {

    /**
     * Template to render
     * @private
     */
    private modalTemplate =
        `
                <SModalWrapper :show="showDialog" :setting="modalOptions" @on-close="closeModal">
                    <ModalComponent :modal-data="modalData" :showDialog.sync="showDialog"/>
                </SModalWrapper>
        `

    /**
     *
     * @inheritDoc
     *
     * @param Modal
     * @param payload
     * @param configs
     */
    public open(Modal: VueConstructor, payload: AnyObject, configs?: ModalConfigs): Promise<AnyObject> {
        return new Promise((resolve) => {
            const _extendedModalComponent = Vue.extend(Modal).extend({
                components: {
                    SModalWrapper,
                },
                props: {
                    showDialog: Boolean,
                    modalData: Object || undefined
                },
                methods: {
                    closeModal(data: AnyObject) {
                        this.$emit('update:showDialog', false)
                        resolve(data)
                    }
                }
            })
            const _tempComponent = Vue.component('modal-component', {
                components: {
                    SModalWrapper,
                    ModalComponent: _extendedModalComponent
                },
                data () {
                    return {
                        showDialog: true,
                        modalData: payload,
                        modalOptions: configs,
                    }
                },
                mounted(): void {
                    //
                },
                methods: {
                    closeModal (data: AnyObject) {
                        this.showDialog = false
                        resolve(data)
                    }
                },
                template: this.modalTemplate
            })

            const _modal = new _tempComponent()
            // Inject Div into DOM
            const div = document.createElement('div')
            div.setAttribute('id', 'async-div')
            document.body.appendChild(div);
            _modal.$mount('#async-div')
        })
    }

}