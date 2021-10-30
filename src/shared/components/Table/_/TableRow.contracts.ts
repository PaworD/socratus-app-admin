import { VueConstructor } from "vue";

export interface TableRowAction {
    component: VueConstructor
}

export interface TableRowItem {
    actions?: TableRowAction[]
    [key: string] : any
}