import type { Router } from 'vue-router'
import NProgress from 'nprogress'

export default function setupLoginGuard(router: Router) {
  router.beforeEach(async (to, form, next) => {
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
        if (form.name === 'login')
          NProgress.done()
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
