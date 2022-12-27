import App from './App.vue'
import type { AppContext, UserModule } from './types'

import 'animate.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const setupModules = (app: AppContext) => {
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  app.mount('#app')
}
setupModules(createApp(App))
