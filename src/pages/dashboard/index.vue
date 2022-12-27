<script setup lang="ts">
import lottie from 'lottie-web'
import { APP_LAYOUT_PARAMS } from '~/config'

defineOptions({
  name: 'Dashboard',
})

const {
  navHeight,
  tabHeight,
  footHeight,
  contentPadding,
} = APP_LAYOUT_PARAMS

const uiStore = useUiStore()

const diffHeight = computed(() => {
  const height = navHeight + footHeight + contentPadding * 2 + 1 + 1 + 3
  return uiStore.settings.showTabs ? height + tabHeight : height
})

const emojiArray = [
  '\\(o_o)/',
  '(o^^)o',
  '(˚Δ˚)b',
  '(^-^*)',
  '(^_^)b',
  '(╯‵□′)╯',
  '(=\'X\'=)',
  '(>_<)',
  '\\(°ˊДˋ°)/',
  'ㄟ(▔▽▔)ㄏ',
]

const getEmoji = (): string =>
  emojiArray[Math.floor(Math.random() * emojiArray.length)]

onMounted(() => {
  lottie.loadAnimation({
    container: document.querySelector('#lottie-cat')!,
    path: 'https://assets2.lottiefiles.com/packages/lf20_D0HSc9DlfZ.json',
    loop: true,
    renderer: 'svg',
  })
})
</script>

<template>
  <div w-70vw mx-a :style="{ height: `calc(100vh - ${diffHeight}px)` }" flex="col center">
    <div id="lottie-cat" w400px h200px />
    <div text-center font-bold>
      <h1 text="2xl" m="t-2 b-2">
        Hi@Everyone, {{ getEmoji() }}. Just have fun.
      </h1>
      <p text-xl m="t-3 b-2" w-40vw mx-a>
        This is a template of admin system built with vite.
        If you haven't used it yet, give it a try!
      </p>
    </div>
  </div>
</template>

