<script setup lang="ts">
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
const { primaryColor } = storeToRefs(useSettingsStore())
replacePrimaryColor(primaryColor.value)
</script>

<template>
  <RouterView />
</template>
