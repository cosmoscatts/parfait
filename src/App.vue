<script setup lang="ts">
import { baseSettings } from '~/settings'
import { replacePrimaryColor } from '~/utils'

useHead({
  title: 'Parfait',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

// reset primary color
const { primaryColor } = storeToRefs(useAppStore())
replacePrimaryColor(primaryColor.value)
const { appReloading, handleReload } = useReload()
handleReload(1200)

// when the window unload, remove the
// tags if do not want cache the tags
const { removeAll } = useTagsStore()
useEventListener(window, 'beforeunload', () => {
  const { showTheTags, cacheTheTags } = baseSettings
  if (!showTheTags || !cacheTheTags)
    removeAll()
})
</script>

<template>
  <WaitForWindowReload v-if="appReloading" />
  <RouterView v-else />
</template>
