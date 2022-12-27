<script setup lang="ts">
const appStore = useAppStore()
const { menuCollapsed } = storeToRefs(appStore)
const { setMenuCollapsed, setMenuUnCollapsed } = appStore

function toggle() {
  const { value: _menuCollapsed } = menuCollapsed
  if (_menuCollapsed)
    setMenuUnCollapsed()
  else setMenuCollapsed()
}
</script>

<template>
  <button
    icon-btn text-xl
    :class="menuCollapsed
      ? 'i-line-md-menu-unfold-right'
      : 'i-line-md-menu-unfold-left'"
    @click="toggle"
  />
</template>
