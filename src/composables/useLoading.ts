export function useLoading(initValue = false) {
  const loading = ref(initValue)

  function setLoading(value: boolean) {
    loading.value = value
  }

  function toggle() {
    loading.value = !loading.value
  }

  return {
    loading,
    setLoading,
    toggle,
  }
}
