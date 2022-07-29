import type { App } from 'vue'
export type UserModule = (app: App) => void
export type { App as AppContext }

export * from '~/typings/user'
export * from '~/typings/role'
export * from '~/typings/menu'
export * from '~/typings/tag'
export * from '~/typings/arco'
export * from '~/typings/global'
export * from '~/typings/color'

