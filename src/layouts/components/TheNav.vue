<script setup lang="ts">
import NavHamburger from '../widgets/NavHamburger.vue'
import NavBreadCrumb from '../widgets/NavBreadCrumb.vue'
import NavFullScreen from '../widgets/NavFullScreen.vue'
import NavBell from '../widgets/NavBell.vue'
import NavAvatar from '../widgets/NavAvatar.vue'
import Logo from '../widgets/Logo.vue'
import Menu from '../widgets/Menu.vue'

const { appMenus } = storeToRefs(usePermissionStore())
const mode: 'vertical' | 'horizontal' | 'pop' | 'popButton' = 'horizontal'
const { layout } = storeToRefs(useAppStore())
const isVertical = computed(() => {
  return layout.value === 'vertical'
})
const { width } = useWindowSize()
let shortLogo = $ref(false)
watchEffect(() => {
  if (!isVertical.value)
    shortLogo = width.value < 1200
})
</script>

<template>
  <div flex-center pr-5 shadow="sm light-900 dark:dark-700">
    <Logo v-if="!isVertical" :class="shortLogo ? 'w-64px' : 'w-200px'" />
    <NavHamburger v-if="isVertical" mx-4 />
    <NavBreadCrumb v-if="isVertical" mr-4 />
    <Menu v-if="!isVertical" :mode="mode" :metadata="appMenus" />
    <div flex-auto />
    <div flex-y-center>
      <a
        icon-btn text-lg i-carbon-logo-github mx-4
        href="https://github.com/dud9/parfait"
        target="_blank" title="GitHub"
      />
      <NavBell mr-4 />
      <NavFullScreen mr-4 />
      <DarkToggle mr-4 />
      <NavAvatar />
    </div>
  </div>
</template>
