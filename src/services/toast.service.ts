import { injectable } from "inversify-props";
import Vue, {VueConstructor} from "vue";
import SToast from "@/shared/components/Toast/Toast.vue";

export enum ToastType {
    ERROR = 'error',
    SUCCESS = 'success'
}

export interface IToastService {
    show(show: boolean, message:string, type: ToastType, duration: number): void
    dismiss(): void
}

@injectable()
export class ToastService implements IToastService {

    private template = `<SToast v-bind="{content: {theme: type, show, message}}"/>`

    public dismiss(): void {
        return
    }

    public toastComponent (show: boolean, message:string, type: ToastType, duration: number): VueConstructor {
        return Vue.component('s-toaster', {
            components: {
              SToast
            },
            data() {
                return {
                    message: message,
                    show: show,
                    type: type,
                    duration: duration
                }
            },
            mounted () {
                setTimeout(() => {
                    this.show = true
                }, 20)
                setTimeout(() => {
                    this.show = false
                }, 2000)
            },
            template: this.template
        })
    }

    public show(show: boolean, message:string, type: ToastType, duration = 200): void {
        const _vueToastComponent = Vue.extend(this.toastComponent(show, message,type, duration))
        const toastInstance = new _vueToastComponent()
        const div = document.createElement('div')
        div.setAttribute('id', 'async-div-toast')
        document.body.appendChild(div);
        toastInstance.$mount('#async-div-toast')
    }

}