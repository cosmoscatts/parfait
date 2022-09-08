import type { Tab } from '~/types'
import { readTabsFromStorageIfCached, writeTabsIntoStorageIfCached } from '~/utils'

export const useTabStore = defineStore(
  'tabStore',
  () => {
    // 记录访问过的页面
    const visitedTabs = ref<Tab[]>([])
    // 记录访问过的缓存页面
    const cachedTabNames = computed<string[]>(() => {
      const names = visitedTabs.value.filter(i => !!i.cached && !!i.name)
        .map(j => j.name) || []
      // `Set` 去重
      return [
        ...new Set([...names]).values(),
      ]
    })

    /**
     * 初始化 `tabs`，如果开启了多页签缓存，需要从缓存中读取历史数据
     */
    function initTabs(userId?: number) {
      if (!userId)
        return
      visitedTabs.value = readTabsFromStorageIfCached(userId)
    }

    /**
     * 添加 `tab`
     */
    function addOneTab(_tab: Tab) {
      // 已经添加的 `tab-path` 集合
      const existPathList = visitedTabs.value.map(i => i.path)
      // 判断是否已经存在
      if (!_tab.path || existPathList.includes(_tab.path))
        return

      visitedTabs.value.push(_tab)

      // 如果开启多页签缓存，则需要写入缓存
      writeTabsIntoStorageIfCached([...visitedTabs.value])
    }

    /**
     * 删除一个 `tab`
     */
    function removeOneTab(_tab: Tab) {
      return new Promise((resolve) => {
        for (const [idx, item] of visitedTabs.value.entries()) {
          if (item.path !== _tab.path)
            continue
          visitedTabs.value.splice(idx, 1)
        }

        // 如果开启多页签缓存，则需要写入缓存
        writeTabsIntoStorageIfCached([...visitedTabs.value])

        resolve({
          visitedTabs,
        })
      })
    }

    /**
     * 删除除了当前 `tab` 之外的所有
     */
    function removerOtherTabs(_tab: Tab) {
      return new Promise((resolve) => {
        visitedTabs.value = [_tab]

        // 如果开启多页签缓存，则需要写入缓存
        writeTabsIntoStorageIfCached([...visitedTabs.value])

        resolve({
          visitedTabs,
        })
      })
    }

    /**
     * 删除 `tab` 集合
     */
    function removeTabsByList(tabList: Tab[]) {
      return new Promise((resolve) => {
        const pathList = tabList.map(i => i.path) || []
        const restTags = visitedTabs.value.filter(i => !pathList.includes(i.path))
        visitedTabs.value = [...restTags]

        // 如果开启多页签缓存，则需要写入缓存
        writeTabsIntoStorageIfCached([...visitedTabs.value])

        resolve({
          visitedTabs,
        })
      })
    }

    /**
     * 删除所有 `tab`
     */
    function removeAllTabs() {
      return new Promise((resolve) => {
        visitedTabs.value = []

        // 如果开启多页签缓存，则需要写入缓存
        writeTabsIntoStorageIfCached([])

        resolve({
          visitedTabs,
        })
      })
    }

    return {
      visitedTabs,
      cachedTabNames,
      initTabs,
      addOneTab,
      removeOneTab,
      removerOtherTabs,
      removeTabsByList,
      removeAllTabs,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
