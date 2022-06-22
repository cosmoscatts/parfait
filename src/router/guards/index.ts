import type { Router } from 'vue-router'
import setupLoginGuard from './setupLoginGuard'
import setupPermissionGuard from './setupPermissionGuard'
import { setRouteEmitter } from '~/utils'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export default function createRouterGuard(router: Router) {
  setupPageGuard(router)
  setupLoginGuard(router)
  setupPermissionGuard(router)
}
