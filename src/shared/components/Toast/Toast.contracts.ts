import { ToastType } from "@/services/toast.service";

export enum ToastTheme {
    Danger = 'danger',
    Success = 'success'
}

export interface Toast {
    theme: ToastType,
    message: string,
    show: boolean
}