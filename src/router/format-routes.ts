import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob('./routes/*.ts', { eager: true })
const formatModules = (_modules: any, result: RouteRecordRaw[]) => {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  return result
}
const appRoutes: RouteRecordRaw[] = formatModules(modules, [])

export default appRoutes
