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
   * whether cache the tags view
   *
   * @default: true
   */
  cacheTheTags: true,
  /**
   * whether show the header
   *
   * @default: true
   */
  fixHeader: true,
  /**
   * theme primary color
   */
  primaryColor: 'arcoblue',
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
