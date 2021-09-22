import Vue, { VueConstructor } from "vue";

import { AbstractModalService, ModalConfigs } from "@/shared/abstract";
import { AnyObject } from "@/shared/models";

declare module 'vue/types/vue' {
    interface Vue {
        $modalService: {
            open: (Modal: VueConstructor, payload: AnyObject, configs?: ModalConfigs) => Promise<AnyObject>
        }
    }
}

export class ModalService extends AbstractModalService {

    private modalTemplate =
        `
            <div style="width: 100px; height: 100px; position: absolute; top: 0; left: 0; z-index: 11; background-color: #2c3e50;">
                <ModalComponent :modalData="modalData" :showDialog.sync="showDialog"/>
            </div>
        `

    public open(Modal: VueConstructor, payload: AnyObject, configs?: ModalConfigs): Promise<AnyObject> {
        return new Promise((resolve) => {
            const _extendedModalComponent = Vue.extend(Modal).extend({
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
            _modal.$mount()
        })
    }

}