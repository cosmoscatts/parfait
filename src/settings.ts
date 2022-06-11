export const baseSettings = reactive<Record<string, any>>({
  /**
   * layout direction - 'vertical' / 'horizontal'
   *
   * @default: 'vertical'
   */
  layout: 'vertical',
  /**
   * whether show the tags view
   *
   * @default: true
   */
  showTheTags: true,
  /**
   * whether show the logo
   *
   * @default: true
   */
  showTheLogo: true,
})
