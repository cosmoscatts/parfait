import { breakpointsTailwind } from '@vueuse/core'
import { useTabStore } from './tabs'
import type { ConfigSettingObject } from '~/config'
import { cacheAppSettings, configSettings } from '~/config'
import {
  cacheSettingsOnStorage,
  clearTabStorage,
  replacePrimaryColor,
  updateSettingsFromStorage,
  writeTabsIntoStorageIfCached,
} from '~/utils'

export const useAppStore = defineStore(
  'appStore',
  () => {
    // 是否为移动端（包含 `PC` 端宽度过小的情况）
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isMobile = breakpoints.smaller('sm')

    // `app` 配置对象
    const baseSettings = ref<ConfigSettingObject>({
      ...configSettings,
    })
    // `app` 暂存配置对象
    const stageSettings = ref<ConfigSettingObject>({
      ...configSettings,
    })

    const initAppSettings = () => {
      // 如果开启了缓存配置, 则从 `storage` 更新配置
      // 未开启，`updateSettingsFromStorage` 方法会返回默认配置
      baseSettings.value = {
        ...updateSettingsFromStorage({
          ...configSettings,
        }),
      }

      // 替换主题色
      replacePrimaryColor(baseSettings.value.themePrimaryColor)
    }

    // 初始化 `app` 设置项的暂存区
    const buildStageData = () => {
      const source = { ...baseSettings.value } as ConfigSettingObject
      stageSettings.value = { ...source } || { ...configSettings }
    }
    buildStageData()

    function resetStageData() {
      buildStageData()
    }

    // 从暂存区更新设置
    function updateSettingsFromStageData() {
      const originThemePrimaryColor = baseSettings.value.themePrimaryColor
      baseSettings.value = { ...stageSettings.value } || { ...configSettings }

      // 如果主题主要色调发生改变，替换主色调
      if (originThemePrimaryColor !== baseSettings.value.themePrimaryColor)
        replacePrimaryColor(baseSettings.value.themePrimaryColor)

      // 如果改变多页签的显示状态 | 多页签的缓存状态
      // 需要更新多页签的缓存
      if (baseSettings.value.showTabs && baseSettings.value.cacheTabs)
        writeTabsIntoStorageIfCached([...useTabStore().visitedTabs])
      else
        clearTabStorage()

      if (cacheAppSettings)
        cacheSettingsOnStorage({ ...baseSettings.value })
    }

    // 菜单是否折叠
    const {
      bool: menuCollapsed,
      setTrue: setMenuCollapsed,
      setFalse: setMenuUnCollapsed,
    } = useBoolean(false)

    return {
      isMobile,
      baseSettings,
      stageSettings,
      initAppSettings,
      resetStageData,
      updateSettingsFromStageData,
      menuCollapsed,
      setMenuCollapsed,
      setMenuUnCollapsed,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
