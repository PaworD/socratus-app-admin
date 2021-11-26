
/**
 * Accordion types
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export enum AccordionType {
    Simple = 'simple'
}

/**
 * Properties for accordion components
 * @author Javlon Khalimjonov <khalimjonov2000@gmail.com>
 */
export interface AccordionProps {
    activeClass: string
    bodyClass: string
    type: AccordionType
    theme?: string
}