<script setup lang="ts">
import avatar from '~/assets/avatar.jpg'

const router = useRouter()
function logout() {
  useLogout()
  Message.success('退出成功')
  useTimeoutFn(() => {
    router.push('/login')
  }, 1000)
}
function onSelect(value: any) {
  const actionMap: Record<string, any> = {
    0: () => router.push('/system/user'),
    1: () => openWindow('https://github.com/faitsse/parfait'),
    2: () => openWindow('https://github.com/faitsse/parfait'),
    3: logout,
  }
  const action = actionMap[value]
  action()
}
</script>

<template>
  <div cursor-pointer>
    <a-dropdown trigger="hover" position="bottom" @select="onSelect">
      <a-avatar :size="32" shape="square">
        <img alt="头像" :src="avatar">
      </a-avatar>
      <template #content>
        <a-doption value="0">
          个人资料
        </a-doption>
        <a-doption value="1">
          Github
        </a-doption>
        <a-doption value="2">
          文档
        </a-doption>
        <a-doption value="3">
          <template #icon>
            <div i-carbon-touch-1-down-filled bg-red />
          </template>
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
