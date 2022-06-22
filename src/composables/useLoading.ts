export function useLoading(initValue = false) {
  const {
    bool: loading,
    setBool: setLoading,
    toggle,
  } = useBoolean(initValue)

  return {
    loading,
    setLoading,
    toggle,
  }
}
