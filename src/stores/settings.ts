import { baseSettings } from '~/settings'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const {
      layout,
      showTheLogo,
      showTheTags,
    } = toRefs(baseSettings)
    function changeSettingsVal({ key, value }: { key: string; value: any }) {
      if (!Object.prototype.hasOwnProperty.call(baseSettings, key))
        return
      baseSettings[key] = value
    }

    return {
      layout,
      showTheLogo,
      showTheTags,
      changeSettingsVal,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
