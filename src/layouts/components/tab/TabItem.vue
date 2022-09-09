<script setup lang="ts">
import {
  TabButton,
  TabChrome,
  TabContextMenu,
} from './components'

function isActive(path?: string) {
  if (!path)
    return false
  if (route.path.startsWith('/redirect'))
    return `/redirect${path}` === route.path
  return path === route.path
}
const router = useRouter()
function closeTag(idx: number) {
  if (tags.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }
  const tag = tags[idx]
  if (!tag)
    return
  tagsStore.removeTag(tag).then(() => {
    // close the current tag that is show
    if (tag.path === route.path) {
      // find the latest
      const latest = tags.slice(-1)[0]
      const path = latest
        ? latest.fullPath!
        : '/'
      router.push(path)
    }
  })
}
</script>

<template>
  <a-dropdown trigger="contextMenu" position="br">
    <RouterLink
      :to="{ path, query }"
    >
      <TabButton v-if="tagButtonShape === 'default'" :title="title" :is-active="isActive(path)">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1
            @click.prevent="closeTag(idx)"
          />
        </template>
      </TabButton>

      <TabChrome v-else :title="title" :is-active="isActive(path)" :is-last="idx === tags.length - 1">
        <template #close>
          <span
            i-ri-close-fill hover="i-carbon-close-filled" ml-1 z-2
            :class="{ '!text-[rgb(var(--primary-6))]': isActive(path) }"
            @click.prevent="closeTag(idx)"
          />
        </template>
      </TabChrome>
    </RouterLink>

    <template #content>
      <TabContextMenu
        :index="idx"
        :tags="tags"
        :has-left-tags="tags.length > 1 && idx > 0"
        :has-right-tags="tags.length > 1 && idx < tags.length - 1"
      />
    </template>
  </a-dropdown>
</template>
