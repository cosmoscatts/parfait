import { appMeta } from '~/config'

/**
 * 包装 `Storage Key`, 拼接项目名称
 */
export function wrapStorageKey(key: string) {
  const { name } = appMeta
  return `${name.toUpperCase()}-${key}`
}
