/**
 * resolve actions
 */
export function executeActions(actions: [string, any][]) {
  actions.some((item) => {
    const [flag, action] = item
    if (flag)
      action()

    return flag
  })
}
