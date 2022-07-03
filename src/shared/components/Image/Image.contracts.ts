
/**
 * @author Javlon Khalimjonov <javlon.khalimjonov@movecloser.pl>
 */
export interface ImageProps {
  /**
   * Determines alternative text for image.
   */
  alt: string

  /**
   * Determines whether image should be lazy loaded.
   */
  lazy: boolean

  /**
   * Determines source of the image
   */
  src: string
}