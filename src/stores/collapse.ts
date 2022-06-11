export const useCollapseStore = defineStore(
  'collapseStore',
  () => {
    const collapse = ref<boolean>(false)
    function toggleCollapse(state: boolean) {
      collapse.value = state
    }
    return {
      collapse,
      toggleCollapse,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
