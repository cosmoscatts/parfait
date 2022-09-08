import App from './App.vue'
import type { AppContext, UserModule } from './types'

import 'animate.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

function init(app: AppContext) {
  Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
    .forEach(i => i.install?.(app))
  app.mount('#app')
}

const app = createApp(App)
init(app)

