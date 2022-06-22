export function useReload() {
  const { bool: appReloading, setTrue, setFalse } = useBoolean(true)

  async function handleReload(duration = 1000) {
    setTrue()
    await nextTick()

    if (duration > 0) {
      useTimeoutFn(() => {
        setFalse()
      }, duration)
    }
  }

  return {
    appReloading,
    handleReload,
  }
}
