import { VueConstructor } from "vue";

import { AnyObject } from "@/shared/models";

export enum ModalSize {
    Small= 'small',
    Large = 'large',
    FullScreen = 'full'
}

export interface ModalConfigs {
    size: ModalSize,
    persistent: boolean
}

export abstract class AbstractModalService {

    public abstract open(Modal: VueConstructor, payload: AnyObject, configs?: ModalConfigs): Promise<AnyObject>

}