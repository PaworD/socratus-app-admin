/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface TextInputProps {
  /**
   * Determines whether input should be flatted.
   */
  flat: boolean

  /**
   * Label for input.
   */
  label: string

  /**
   * Placeholder text for current input.
   */
  placeholder: string

  /**
   * Determines whether input should be required.
   */
  required: boolean

  /**
   * Size of the input
   */
  size: InputSize

  /**
   * Type of the input
   */
  type: InputType

  /**
   * Value `attr` of the input
   */
  value: string

  /**
   * Determines whether input should be rounded.
   */
  withRadius: boolean
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export enum InputSize {
  NORMAL = 'normal',
  MEDIUM = 'medium',
  SMALL = 'small'
}

/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export enum InputType {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text'
}