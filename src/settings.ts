export const baseSettings = reactive<Record<string, any>>({
  /**
   * layout direction - 'vertical' / 'horizontal'
   *
   * @default: 'vertical'
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
   * whether show the header
   *
   * @default: true
   */
  fixHeader: true,
  /**
   * theme primary color
   */
  primaryColor: '',
})
