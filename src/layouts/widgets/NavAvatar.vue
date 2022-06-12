<script setup lang="ts">
function onSelect() {}
</script>

<template>
  <a-dropdown trigger="hover" position="bottom" @select="onSelect">
    <a-avatar :size="40">
      faitsse
    </a-avatar>
    <template #content>
      <a-doption>个人资料</a-doption>
      <a-doption>Github</a-doption>
      <a-doption>文档</a-doption>
      <a-doption>
        <template #icon>
          <div i-carbon-touch-1-down-filled bg-red />
        </template>
        退出登录
      </a-doption>
    </template>
  </a-dropdown>
</template>
