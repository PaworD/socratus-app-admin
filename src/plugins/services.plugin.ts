import { ModalService } from "@/services/modal.service";

export const modalService = new ModalService()

export const ServicesPlugin = {
    install (Vue: any, options?: any) {
        Vue.prototype.$modalService = modalService
    }
}
export default ServicesPlugin