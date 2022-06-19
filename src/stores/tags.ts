import type { Tag } from '~/types'

export const useTagsStore = defineStore(
  'tagsStore',
  () => {
    const visitedPages = ref<Tag[]>([])
    const cachedPageNames = ref<string[]>([])
    function addTag(tag: Tag) {
      const oldPath = visitedPages.value.map(i => i.path)
      // already visited
      if (!tag.path || oldPath.includes(tag.path))
        return
      visitedPages.value.push(tag)
      if (tag.cached && !cachedPageNames.value.includes(tag.name!))
        cachedPageNames.value.push(tag.name!)
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
          if (tag.cached && cachedPageNames.value.findIndex(i => i === tag.name) > -1)
            cachedPageNames.value.splice(i, 1)
        }
        resolve({
          visitedPages,
        })
      })
    }
    function removerOthers(tag: Tag) {
      return new Promise((resolve) => {
        visitedPages.value = [tag]
        cachedPageNames.value = tag.cached
          ? [tag.name!]
          : []
        resolve({
          visitedPages,
        })
      })
    }
    function removeAll() {
      return new Promise((resolve) => {
        visitedPages.value = []
        cachedPageNames.value = []
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
