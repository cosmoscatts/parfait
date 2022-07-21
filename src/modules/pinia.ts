import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'
import type { UserModule } from '~/types'

const store = createPinia()
store.use(piniaPluginPersist)

export const install: UserModule = ({ use }) => {
  use(store)
}
