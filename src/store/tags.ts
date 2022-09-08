import type { RemovableRef } from '@vueuse/core'
import type { Tag } from '~/types'
import { baseSettings } from '~/settings'
import { EnumStorageKey } from '~/enum'

const TAGS_KEY = EnumStorageKey.tags
const tagsOnStorage: RemovableRef<{ [key: string]: Tag[] }> = useStorage(TAGS_KEY, {}, localStorage)

function updateTagStorageIfCached(_visitedPages: Tag[]) {
  const { showTheTags, cacheTheTags } = baseSettings
  // if cache the tags, do update!
  if (!showTheTags || !cacheTheTags)
    return
  const { user } = useUserStore()
  const userId = user?.id
  if (!userId)
    return
  const key = `user-${userId}`
  const origin = tagsOnStorage.value || {}
  origin[key] = [..._visitedPages]
  tagsOnStorage.value = origin
}

export const useTagsStore = defineStore(
  'tagsStore',
  () => {
    const visitedPages = ref<Tag[]>([])
    const cachedPageNames = ref<string[]>([])

    watch(
      [() => baseSettings.showTheTags, () => baseSettings.cacheTheTags],
      ([v1, v2]) => {
        if (!v1 || !v2)
          tagsOnStorage.value = {}
        else
          updateTagStorageIfCached([...visitedPages.value])
      },
    )

    function updateFromTagStorageIfCached(userId?: number) {
      const { showTheTags, cacheTheTags } = baseSettings
      // if cache the tags, do update!
      if (!showTheTags || !cacheTheTags || !userId)
        return
      const map = unref(tagsOnStorage) || {}
      const key = `user-${userId}`
      visitedPages.value = map[key] || []
    }

    function addTag(tag: Tag) {
      const oldPath = visitedPages.value.map(i => i.path)
      // already visited
      if (!tag.path || oldPath.includes(tag.path))
        return
      visitedPages.value.push(tag)
      if (tag.cached && !cachedPageNames.value.includes(tag.name!))
        cachedPageNames.value.push(tag.name!)
      updateTagStorageIfCached([...visitedPages.value])
    }
    function updateTag(tag: Tag) {
      for (const page of visitedPages.value) {
        if (page.path !== tag.path)
          continue
        Object.assign(page, tag)
      }
      updateTagStorageIfCached([...visitedPages.value])
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
        updateTagStorageIfCached([...visitedPages.value])
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
        updateTagStorageIfCached([...visitedPages.value])
        resolve({
          visitedPages,
        })
      })
    }
    function removeTagsByList(tagList: Tag[]) {
      if (tagList.length === 0)
        return
      const pathList = tagList.map(i => i.path) || []
      const restTags = visitedPages.value.filter(i => !pathList.includes(i.path))
      visitedPages.value = [...restTags]
      cachedPageNames.value = restTags.filter(i => i.cached).map(i => i.name ?? '') || []
      updateTagStorageIfCached([...visitedPages.value])
    }
    function removeAll() {
      return new Promise((resolve) => {
        visitedPages.value = []
        cachedPageNames.value = []
        updateTagStorageIfCached([])
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
      removeTagsByList,
      removerOthers,
      removeAll,
      updateFromTagStorageIfCached,
    }
  },
)
