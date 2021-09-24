export enum CardTheme {
    Primary = 'primary',
    Default = 'default'
}

export interface Card {
    bodyClass: string
    borderless: boolean
    headerClass: string
    footerClass: string
    theme: CardTheme
}