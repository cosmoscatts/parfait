import { APP_SETTINGS, type Settings } from '~/config'
import {
  applyCachedSettings,
  cacheSettings,
  cacheTabs,
  clearCachedTabs,
  createPrimaryColor,
} from '~/utils'

export const useUiStore = defineStore(
  'uiStore',
  () => {
    const init = () => {
      const data = APP_SETTINGS.cacheAppSettings
        ? applyCachedSettings(APP_SETTINGS)
        : APP_SETTINGS
      return Array.from({ length: 2 })
        .map(_ => reactive<Settings>({ ...G.clone(data) }))
    }
    const [settings, settingsCopy] = init()
    createPrimaryColor(settings.primaryColor)

    const collapse = useBool(false)

    return {
      settings,
      settingsCopy,
      collaspeSide: {
        get: () => collapse.bool.value,
        collapse: collapse.setTrue,
        unCollapse: collapse.setFalse,
        toggle: collapse.toggle,
      },
      applyCopySettings() { // 保存暂存的副本设置
        // 如果主题主要色调发生改变，替换主色调
        if (settings.primaryColor !== settingsCopy.primaryColor) {
          createPrimaryColor(settingsCopy.primaryColor)
        }

        G.assignObj(settingsCopy, settings)

        // 如果改变 [showTabs | cacheTabs]
        // 需要更新多页签的缓存
        if (settings.showTabs && settings.cacheTabs) {
          cacheTabs([...useTabStore().tabs])
        } else {
          clearCachedTabs()
        }

        if (settings.cacheAppSettings) cacheSettings({ ...settings })
      },
      resetCopySettings() { // 重置副本
        G.assignObj(settings, settingsCopy)
      },
    }
  },
  { persist: { enabled: true } },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot))
}
