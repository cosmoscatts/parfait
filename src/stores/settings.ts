import type { Ref } from 'vue'
import { baseSettings } from '~/settings'
import { replacePrimaryColor } from '~/utils'

export const useSettingsStore = defineStore(
  'settingsStore',
  () => {
    const {
      layout,
      showTheLogo,
      showTheTags,
      fixHeader,
      primaryColor,
      openAnimation,
      animationMode,
      theme,
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
        baseSettings[k] = unref(v)
      replacePrimaryColor(primaryColor.value)
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
      openAnimation,
      animationMode,
      theme,
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
