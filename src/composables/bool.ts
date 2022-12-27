import type { Ref } from 'vue'

export function useBool(initValue = false): {
  bool: Ref<boolean>
  setBool: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
} {
  const bool = ref(initValue)
  const setBool = (value: boolean) => bool.value = value
  const setTrue = () => setBool(true)
  const setFalse = () => setBool(false)
  const toggle = () => setBool(!bool.value)
  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}

export function useLoading(initValue = false): {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  startLoading: () => void
  endLoading: () => void
  toggleLoading: () => void
} {
  const {
    bool: loading,
    setBool: setLoading,
    setTrue: startLoading,
    setFalse: endLoading,
    toggle: toggleLoading,
  } = useBool(initValue)
  return {
    loading,
    setLoading,
    startLoading,
    endLoading,
    toggleLoading,
  }
}
