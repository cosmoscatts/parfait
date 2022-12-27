import type { RemovableRef } from '@vueuse/core'
import { Token } from './token'
import { SETTINGS_KEY, TABS_KEY } from '~/config'
import type { Settings } from '~/config'
import type { Tab } from '~/types'

const tabStorage: RemovableRef<{ [key: string]: Tab[] }> = useStorage(TABS_KEY, {}, localStorage)
const settingsStorage: RemovableRef<Settings | Object> = useStorage(SETTINGS_KEY, {}, localStorage)

export const cacheSettings = (settings = {}) => { // 将 settings 写入 storage
  if (!settingsStorage.value) return
  settingsStorage.value = G.clone(settings)
}

export const applyCachedSettings = (source: Settings) => ({ // 应用缓存的 settings
  ...G.clone(source),
  ...(settingsStorage.value ?? {}),
})

export const cacheTabs = (tabs: Tab[]) => {
  if (!Token.get()) return
  if (!tabStorage.value) tabStorage.value = {}
  tabStorage.value[Token.get()!] = [...tabs]
}

export const applyCachedTabs: () => Tab[] = () => {
  if (!Token.get()) return []
  const tabData = tabStorage.value || {}
  return tabData[Token.get()!] || []
}

export const clearCachedTabs = () => tabStorage.value = {} // 清除缓存的 tab
