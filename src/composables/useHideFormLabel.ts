export const isLabelHidden = ref(false)
const { width } = useWindowSize()
watchEffect(() => {
  isLabelHidden.value = unref(width) < 1200
})
