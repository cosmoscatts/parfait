import { baseSettings } from '~/settings'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const {
      layout,
      showTheLogo,
      showTheTags,
      fixHeader,
      primaryColor,
    } = toRefs(baseSettings)
    function changeSettingsVal({ key, value }: { key: string; value: any }) {
      if (!Object.prototype.hasOwnProperty.call(baseSettings, key))
        return
      baseSettings[key] = value
    }
    const stage = reactive({})

    function buildStage() {

    }
    function swape() {

    }

    function getStageVal() {
      return stage
    }
    function updateByStage() {

    }
    function resetStage() {

    }

    return {
      layout,
      showTheLogo,
      showTheTags,
      fixHeader,
      primaryColor,
      changeSettingsVal,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
