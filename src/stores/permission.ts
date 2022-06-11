import type { RouteRecordRaw } from 'vue-router'
import type { Menu } from '~/types'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const ownMenus = ref<Menu[]>([])
    const ownRoutes = ref<RouteRecordRaw[]>([])
    const cachedPageNames = ref<string[]>([])

    return {
      ownMenus,
      ownRoutes,
      cachedPageNames,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
