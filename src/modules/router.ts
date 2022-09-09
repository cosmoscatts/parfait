import router, { createRouterGuard } from '~/router'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) => {
  createRouterGuard(router)
  use(router)
}
