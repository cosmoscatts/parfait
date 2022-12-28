import type { Menu, Result } from '~/types'
import { APP_MENU } from '~/config'

export const MenuApi = {
  fetchMenuList() {
    return new Promise<Result<Menu[]>>((resolve) => {
      resolve({
        code: 0,
        data: APP_MENU.defaultMenus,
        message: '',
      })
    })
  },
  fetchMenuListByRoleId(_params: Record<string, number>) {
    // return useRequest.get('/menuApi/menus', { urlParams: params }) as unknown as Promise<Result<Menu[]>>
  },
}
