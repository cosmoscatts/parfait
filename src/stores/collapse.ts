export const useCollapseStore = defineStore(
  'collapseStore',
  () => {
    const collapse = ref<boolean>(false)
    const siderWidth = computed(() => {
      return collapse.value
        ? 64
        : 200
    })
    function toggleCollapse(state: boolean) {
      collapse.value = state
    }
    return {
      collapse,
      siderWidth,
      toggleCollapse,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
