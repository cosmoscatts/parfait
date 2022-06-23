import { EnumStorageKey } from '~/enum'

const APP_SETTINGS_KEY = EnumStorageKey.appSettings
const appSettingsOnStorage = useStorage(APP_SETTINGS_KEY, {}, localStorage)

export function cacheAppSettings(settings = {}) {
  if (!Object.keys(settings).length)
    return

  appSettingsOnStorage.value = settings
}

export function updateFromStorage(target = reactive<Record<string, any>>({})) {
  const source = unref(appSettingsOnStorage)
  if (!source || !Object.keys(source).length)
    return

  Object.entries(source).forEach(([k, v]) => {
    target[k] = v
  })
}
