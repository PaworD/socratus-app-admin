export enum ToastTheme {
    Danger = 'danger',
    Success = 'success'
}

export interface Toast {
    theme: ToastTheme,
    message: string,
    show: boolean
}