import type { Menu } from '~/types'
import { defaultMenuIconMap, defaultMenus, menuSource } from '~/config'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    const menuIconMap = ref(defaultMenuIconMap)

    /**
     * 获取菜单
     */
    async function fetchAppMenus() {
      appMenus.value = menuSource === 'front'
        ? [...defaultMenus]
        : []
    }

    /**
     * 清空菜单
     */
    function removeAppMenus() {
      appMenus.value = []
    }

    return {
      appMenus,
      menuIconMap,
      fetchAppMenus,
      removeAppMenus,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
