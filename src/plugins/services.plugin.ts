import { ModalService } from "@/services/modal.service";



export const ServicesPlugin = {
    install (Vue: any, options?: any) {
        Vue.prototype.$modalService = new ModalService()
    }
}
export default ServicesPlugin