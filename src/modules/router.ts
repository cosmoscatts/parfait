import router from '~/router'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) => {
  use(router)
}
