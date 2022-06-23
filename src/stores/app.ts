import type { Ref } from 'vue'
import { baseSettings } from '~/settings'
import { cacheAppSettings, replacePrimaryColor, updateFromStorage } from '~/utils'

export const useAppStore = defineStore(
  'appStore',
  () => {
    // update the history settings from localStorage
    updateFromStorage(baseSettings)

    const {
      layout,
      showTheLogo,
      showTheTags,
      cacheTheTags,
      fixHeader,
      primaryColor,
      openAnimation,
      animationMode,
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

      // update the primary color
      replacePrimaryColor(primaryColor.value)

      // write settings to localStorage
      cacheAppSettings(baseSettings)
    }

    function resetStage() {
      buildStage()
    }

    // the collapse state of menu
    const {
      bool: menuCollapsed,
      setBool: toggleMenuCollapsed,
    } = useBoolean()

    return {
      layout,
      showTheLogo,
      showTheTags,
      cacheTheTags,
      fixHeader,
      primaryColor,
      openAnimation,
      animationMode,
      menuCollapsed,
      getStageVal,
      updateByStage,
      resetStage,
      toggleMenuCollapsed,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
