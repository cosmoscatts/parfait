/**
 * 通用 `Loading` 方法
 */
export function useLoading(initValue = false) {
  const {
    bool: loading,
    setBool: setLoading,
    setTrue: startLoading,
    setFalse: endLoading,
    toggle: toggleLoading,
  } = useBoolean(initValue)

  return {
    loading,
    setLoading,
    startLoading,
    endLoading,
    toggleLoading,
  }
}
