<script setup lang="ts">
import defaultAvatar from '~/assets/default-avatar.jpg'
import { APP_META } from '~/config'

const router = useRouter()

function logout() {
  ANotification.success({
    title: '登出成功',
    content: '记得回来~',
    duration: 1000,
  })
  useTimeoutFn(() => {
    router.push('/login')
    useLogout()
  }, 1000)
}

function onSelect<T extends string | number | Record<string, any> | undefined>(value: T) {
  if (typeof value !== 'string')
    return
  const actionMap: Record<string, Function> = {
    0: () => router.push('/profile'),
    1: () => useOpenWindow(APP_META.github),
    2: logout,
  }
  actionMap?.[value]?.()
}

const { user } = storeToRefs(useUserStore())
const avatar = computed(() => {
  return user.value?.avatar ?? defaultAvatar
})
</script>

<template>
  <a-dropdown trigger="hover" position="bottom" @select="onSelect">
    <a-avatar :size="32" shape="square" cursor-pointer>
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
          <div i-ri-logout-box-r-line />
        </template>
        退出登录
      </a-doption>
    </template>
  </a-dropdown>
</template>
