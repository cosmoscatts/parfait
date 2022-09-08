import { appMeta } from '~/config'

export function useHeadMeta() {
  const { name, description } = appMeta
  useHead({
    title: name,
    meta: [
      { name: 'description', content: description },
      {
        name: 'theme-color',
        content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: computed(() => isDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
      },
    ],
  })
}
