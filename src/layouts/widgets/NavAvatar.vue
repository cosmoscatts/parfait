<script setup lang="ts">
const router = useRouter()
function logout() {
  Message.success('登出成功')
  useTimeoutFn(() => {
    router.push('/login')
    useLogout()
  }, 1000)
}
function onSelect(value: any) {
  const actionMap: Record<string, any> = {
    0: () => router.push('/profile'),
    1: () => useOpenWindow('https://github.com/dud9/parfait'),
    2: logout,
  }
  const action = actionMap[value]
  action()
}
const userStore = useUserStore()
const avatar = computed(() => {
  return userStore.user?.avatar
})
</script>

<template>
  <div cursor-pointer>
    <a-dropdown trigger="hover" position="bottom" @select="onSelect">
      <a-avatar :size="32" shape="square">
        <img alt="头像" :src="avatar">
      </a-avatar>
      <template #content>
        <a-doption value="0">
          <template #icon>
            <div i-carbon-user-profile />
          </template>
          个人资料
        </a-doption>
        <a-doption value="1">
          <template #icon>
            <div i-carbon-document />
          </template>
          文档
        </a-doption>
        <a-doption value="2">
          <template #icon>
            <div i-carbon-touch-1-filled bg-red />
          </template>
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
