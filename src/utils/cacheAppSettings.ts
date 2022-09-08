import type { RemovableRef } from '@vueuse/core'
import { wrapStorageKey } from './wrapStorageKey'
import { appStorageKeyEnum } from '~/enum'
import type { ConfigSettingObject } from '~/config'

/** `app-settings` 缓存在 `storage` 中的 `key` */
const APP_SETTINGS_KEY = wrapStorageKey(appStorageKeyEnum.appSettings)
const appSettingsStorage: RemovableRef<ConfigSettingObject | Object> = useStorage(APP_SETTINGS_KEY, {}, localStorage)

/**
 * 将 `settings` 写入 `storage`
 */
export const cacheSettingsOnStorage = (settings = {}) => {
  if (!appSettingsStorage.value)
    return
  appSettingsStorage.value = settings
}

/**
 * 从 `storage` 更新 `settings`
 */
export const updateSettingsFromStorage = (target: ConfigSettingObject) => {
  const source = appSettingsStorage.value

  if (!source || !Object.keys(source).length)
    return { ...target }

  return {
    ...target,
    ...source,
  }
}
