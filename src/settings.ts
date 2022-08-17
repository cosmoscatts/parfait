export const baseSettings = reactive<Record<string, any>>({
  /**
   * layout direction - 'vertical' | 'horizontal'
   *
   * @default: 'horizontal'
   */
  layout: 'horizontal',
  /**
   * whether show the logo
   *
   * @default: true
   */
  showTheLogo: true,
  /**
   * whether show the tags view
   *
   * @default: true
   */
  showTheTags: true,
  /**
   * the shape of the tag button - 'default' | 'chrome'
   *
   * @default: 'chrome'
   */
  tagButtonShape: 'chrome',
  /**
   * whether cache the tags view
   *
   * @default: true
   */
  cacheTheTags: true,
  /**
   * whether fix the header
   *
   * @default: true
   */
  fixHeader: true,
  /**
   * theme primary color
   *  - 'red' | 'orangered' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green'
   *  - 'cyan' | 'blue' | 'arcoblue' | 'purple' | 'pinkpurple' | 'gray' | 'magenta'
   *
   * @default: 'orangered'
   */
  primaryColor: 'orangered',
  /**
   * whether open page animate
   *
   * @default: true
   */
  openAnimation: true,
  /**
   * animate type - 'fade-slide' | 'fade' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out'
   *
   * @default: 'fade-slide'
   */
  animationMode: 'fade-slide',
})

/**
 * the mode of theme
 *  - 'dark': dark mode
 *  - 'light': light mode
 *  - 'auto': just follow the system mode
 *
 * @default: 'auto'
 */
export const themeMode: 'dark' | 'light' | 'auto' = 'auto'
