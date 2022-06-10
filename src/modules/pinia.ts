import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist-uni'

const store = createPinia()
store.use(piniaPluginPersist)

export default {
  install(app: any) {
    app.use(store)
  },
}
