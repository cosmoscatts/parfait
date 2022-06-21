/**
 * resolve actions
 */
export function actuatorActions(actions: [string, any][]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag)
      action()

    return flag
  })
}
