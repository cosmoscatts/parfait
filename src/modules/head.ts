import { createHead } from '@vueuse/head'
import type { UserModule } from '~/types'

export const install: UserModule = ({ use }) => {
  use(createHead())
}
