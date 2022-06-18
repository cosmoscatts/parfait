import type { Router } from 'vue-router'
import NProgress from 'nprogress'

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    NProgress.start()
    const { user } = useUserStore()
    if (user) {
      if (user.roleId) {
        next()
      }
      else {
        useLogout()
        Message.error('请联系管理员配置用户角色')
        next('/login')
      }
    }
    else {
      if (to.name === 'login') {
        next()
        return
      }
      next('/login')
    }
  })
}
