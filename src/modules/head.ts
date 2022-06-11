import { createHead } from '@vueuse/head'

export default {
  install(app: any) {
    app.use(createHead())
  },
}
