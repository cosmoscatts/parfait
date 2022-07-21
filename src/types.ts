import type { App } from 'vue'
export type UserModule = (app: App) => void
export type { App as AppContext }

export * from '~/types/user'
export * from '~/types/role'
export * from '~/types/menu'
export * from '~/types/tag'
export * from '~/types/arco'
export * from '~/types/global'

