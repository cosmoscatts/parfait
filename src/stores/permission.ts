import type { Menu } from '~/types'
import { menus } from '~/menus'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    const cachedPageNames = ref<string[]>([])

    function fetchAppMenus() {
      appMenus.value = menus
    }

    return {
      appMenus,
      cachedPageNames,
      fetchAppMenus,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
