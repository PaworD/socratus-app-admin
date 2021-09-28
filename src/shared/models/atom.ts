export interface AnyObject {
    [key: string]: any
}

export interface Identifier {
    id: number | string
}

export enum Role {
    ADMIN = 1
}

export interface Image extends Identifier{
    alt: string
    url: string
}
