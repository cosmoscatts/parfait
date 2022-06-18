import type { Menu } from '~/types'
import { menus } from '~/menus'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    function fetchAppMenus() {
      appMenus.value = menus
    }
    function removeAppMenus() {
      appMenus.value = []
    }

    return {
      appMenus,
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
