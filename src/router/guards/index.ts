import type { Router } from 'vue-router'
import setupLoginGuard from './loginGuard'
import setupPermissionGuard from './permissionGuard'

function setupPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    // emit route change
    setRouteEmitter(to)
  })
}

export function createRouteGuard(router: Router) {
  setupPageGuard(router)
  setupLoginGuard(router)
  setupPermissionGuard(router)
}
