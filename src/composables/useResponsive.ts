/**
 * 定义一些响应式布局处理，用于自适应屏幕变化
 */

/** 定于隐藏 `label` 的宽度 */
const HIDDEN_WIDTH = 1100
const { width } = useWindowSize()
/** 处理 `form-label`，当屏幕尺寸小于定义的宽度时，隐藏 `label` */
export const useResponsiveFormLabelHidden = ref(width.value < HIDDEN_WIDTH)

function handleResponsiveFormLabelHidden(val: number) {
  useResponsiveFormLabelHidden.value = val < HIDDEN_WIDTH
}

watch(width, handleResponsiveFormLabelHidden)
