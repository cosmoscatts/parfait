export function useReload() {
  const { bool: reloadFlag, setTrue, setFalse } = useBoolean(true)

  async function handleReload(duration = 0) {
    setFalse()
    await nextTick()

    if (duration > 0) {
      setTimeout(() => {
        setTrue()
      }, duration)
    }
  }

  return {
    reloadFlag,
    handleReload,
  }
}
