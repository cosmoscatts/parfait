import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) =>
  use(createPinia().use(piniaPluginPersist))
