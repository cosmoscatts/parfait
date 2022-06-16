import type { Tag } from '~/types'

export const useTagsStore = defineStore(
  'tagsStore',
  () => {
    const visitedPages = ref<Tag[]>([])
    function addTag(tag: Tag) {
      const oldPath = visitedPages.value.map(i => i.path)
      // already visited
      if (!tag.path || oldPath.includes(tag.path))
        return
      visitedPages.value.push(tag)
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
        resolve({
          visitedPages,
        })
      })
    }
    function removerOthers(tag: Tag) {
      return new Promise((resolve) => {
        visitedPages.value = [tag]
        resolve({
          visitedPages,
        })
      })
    }
    function removeAll() {
      return new Promise((resolve) => {
        visitedPages.value = []
        resolve({
          visitedPages,
        })
      })
    }

    return {
      visitedPages,
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
