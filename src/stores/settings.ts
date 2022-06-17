import type { Ref } from 'vue'
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
    // stage the change of style right panel done
    const stage = reactive<Record<string, Ref>>({})
    function buildStage() {
      for (const [k, v] of Object.entries(toRaw(baseSettings)))
        stage[k] = ref(v)
    }
    buildStage()
    function getStageVal() {
      return toRefs(stage)
    }
    function updateByStage() {
      for (const [k, v] of Object.entries(toRaw(stage)))
        baseSettings[k] = ref(v)
    }
    function resetStage() {
      buildStage()
    }

    return {
      layout,
      showTheLogo,
      showTheTags,
      fixHeader,
      primaryColor,
      getStageVal,
      updateByStage,
      resetStage,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
