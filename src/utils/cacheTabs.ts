import type { RemovableRef } from '@vueuse/core'
import { wrapStorageKey } from './wrapStorageKey'
import type { Tab } from '~/types'
import { appStorageKeyEnum } from '~/enum'

/** `tab` 缓存在 `storage` 中的 `key` */
const TABS_KEY = wrapStorageKey(appStorageKeyEnum.tabs)
const tabStorage: RemovableRef<{ [key: string]: Tab[] }> = useStorage(TABS_KEY, {}, localStorage)

/**
 * 判断是否开启多页签缓存
 */
function needCacheTabs() {
  const { baseSettings: { showTabs, cacheTabs } } = useAppStore()
  return showTabs && cacheTabs
}

/**
 * 如果开启缓存多页签，将多页签 `Tabs` 写入 `Storage`
 */
export function writeTabsIntoStorageIfCached(_visitedPages: Tab[]) {
  if (!needCacheTabs())
    return
  const { user } = useUserStore()
  const userId = user?.id
  if (!userId)
    return
  // 每个用户单独存放，根据用户 `id` 生成 `key`
  const key = `user-${userId}`
  const origin = tabStorage.value || {}
  origin[key] = [..._visitedPages]
  tabStorage.value = origin
}

/**
 * 如果开启缓存多页签，从 `Storage` 读取多页签 `Tabs`
 */
export function readTabsFromStorageIfCached(userId: number) {
  if (!needCacheTabs())
    return []
  const tabData = tabStorage.value || {}
  const key = `user-${userId}`
  return tabData[key] || []
}

export function clearTabStorage() {
  tabStorage.value = {}
}
