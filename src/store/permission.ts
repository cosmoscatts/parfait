import type { Menu } from '~/types'
import { defaultMenus } from '~/config'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    function fetchAppMenus() {
      appMenus.value = defaultMenus
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
