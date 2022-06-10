import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'

function init(app: any) {
  Object.values(import.meta.globEager('./modules/*.ts')).forEach(i => i.install?.(app))
  app.mount('#app')
}
const app = createApp(App)
init(app)

