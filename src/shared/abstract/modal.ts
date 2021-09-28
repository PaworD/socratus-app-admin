import { VueConstructor } from "vue";

import { AnyObject } from "@/shared/models";

/**
 * Modal Sizes
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export enum ModalSize {
    ExtraSmall = 'extra_small',
    Small= 'small',
    Large = 'large',
    FullScreen = 'fullscreen'
}

/**
 * Modal configuration
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface ModalConfigs {
    /**
     * Modal Header visibility
     * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
     */
    hasHeader: boolean

    /**
     * Modal Size configuration
     * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
     */
    size: ModalSize,
    /**
     * Modal screen persistent state
     * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
     */
    persistent: boolean
}

/**
 * Modal size attributes
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export interface ModalSizeConfig {
    w: number
    h: number
}

/**
 * Definition of modal's size
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 *
 */
export const sizeMap: Record<ModalSize, ModalSizeConfig> = {
    [ModalSize.ExtraSmall] : {w: 25, h:25},
    [ModalSize.FullScreen] : {w: 100, h: 100},
    [ModalSize.Large] : {w: 75, h: 75},
    [ModalSize.Small] : {w: 50, h: 50}
}

/**
 * Modal Service class that every modal-service based class should extend
 * [WARNING] Do not forget to declare module for [ts]
 *
 * @abstract
 *
 * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
 */
export abstract class AbstractModalService {
    /**
     *
     * Action to fire modal screen opening
     *
     * @param Modal
     * @param payload
     * @param configs
     *
     * @author Javlon Khalimjonov <khalimjanov2000@gmail.com>
     */
    public abstract open(Modal: VueConstructor, payload: AnyObject, configs: ModalConfigs): Promise<AnyObject>

}