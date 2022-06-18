import type { Tag } from '~/types'

export const useTagsStore = defineStore(
  'tagsStore',
  () => {
    const visitedPages = ref<Tag[]>([])
    const cachedPageNames = new Set<string>()
    function addTag(tag: Tag) {
      const oldPath = visitedPages.value.map(i => i.path)
      // already visited
      if (!tag.path || oldPath.includes(tag.path))
        return
      visitedPages.value.push(tag)
      if (tag.cached)
        cachedPageNames.add(tag.name!)
    }
    function updateTag(tag: Tag) {
      for (const page of visitedPages.value) {
        if (page.path !== tag.path)
          continue
        Object.assign(page, tag)
      }
    }
    function removeTag(tag: Tag) {
      return new Promise((resolve) => {
        for (const [i, v] of visitedPages.value.entries()) {
          if (v.path !== tag.path)
            continue
          visitedPages.value.splice(i, 1)
        }
        cachedPageNames.delete(tag.name || '')
        resolve({
          visitedPages,
        })
      })
    }
    function removerOthers(tag: Tag) {
      return new Promise((resolve) => {
        visitedPages.value = [tag]
        cachedPageNames.clear()
        if (tag.cached)
          cachedPageNames.add(tag.name!)
        resolve({
          visitedPages,
        })
      })
    }
    function removeAll() {
      return new Promise((resolve) => {
        visitedPages.value = []
        cachedPageNames.clear()
        resolve({
          visitedPages,
        })
      })
    }

    return {
      visitedPages,
      cachedPageNames,
      addTag,
      updateTag,
      removeTag,
      removerOthers,
      removeAll,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
