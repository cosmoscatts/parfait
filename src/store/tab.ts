import type { Tab } from '~/types'
import { Token, applyCachedTabs, cacheTabs } from '~/utils'

export const useTabStore = defineStore(
  'tabStore',
  () => {
    const tabs = ref<Tab[]>([])
    const cachedTabNames = computed<string[]>(() => { // 记录访问过的缓存页面
      const names = tabs.value
        .filter(i => !!i.cached && !!i.name)
        .map(j => j.name)
      return [...new Set(names).values()]
    })

    const createTabs = () => {
      const uiStore = useUiStore()
      if (uiStore.settings.cacheTabs) {
        tabs.value = applyCachedTabs()
      } else {
        if (!Token.get()) {
          tabs.value = []
        }
      }
    }

    const cacheIfNeed = () => { // 开启 tab 缓存，则需要写入缓存
      const uiStore = useUiStore()
      if (uiStore.settings.cacheTabs) {
        cacheTabs(G.clone(tabs.value))
      }
    }

    const addTab = (tab: Tab) => {
      return new Promise((resolve) => {
        if (tab.path && !tabs.value.map(i => i.path).includes(tab.path)) {
          tabs.value.push(G.clone(tab))
          cacheIfNeed()
        }
        resolve({ tabs })
      })
    }

    const removeOneTab = (tab: Tab) => {
      return new Promise((resolve) => {
        const index = tabs.value.findIndex(i => i.path === tab.path)
        if (~index) {
          tabs.value.splice(index, 1)
          cacheIfNeed()
        }
        resolve({ tabs })
      })
    }

    const removeOtherTabs = (tab: Tab) => {
      return new Promise((resolve) => {
        tabs.value = [tab]
        cacheIfNeed()
        resolve({ tabs })
      })
    }

    const removeListTabs = (list: Tab[]) => {
      return new Promise((resolve) => {
        const pathList = list.map(i => i.path) || []
        if (pathList.length) {
          tabs.value = [...tabs.value.filter(i => !pathList.includes(i.path))]
          cacheIfNeed()
        }
        resolve({ tabs })
      })
    }

    const removeAllTabs = () => {
      return new Promise((resolve) => {
        tabs.value = []
        cacheIfNeed()
        resolve({ tabs })
      })
    }

    return {
      tabs,
      cachedTabNames,
      createTabs,
      addTab,
      removeOneTab,
      removeOtherTabs,
      removeListTabs,
      removeAllTabs,
    }
  },
  { persist: { enabled: true } },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTabStore, import.meta.hot))
}
