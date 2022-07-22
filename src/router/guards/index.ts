import type { Router } from 'vue-router'
import setupLoginGuard from './setupLoginGuard'
import setupPermissionGuard from './setupPermissionGuard'

export default function createRouterGuard(router: Router) {
  setupLoginGuard(router)
  setupPermissionGuard(router)
}
