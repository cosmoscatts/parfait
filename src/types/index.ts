import type { App } from 'vue'
export type UserModule = (app: App) => void
export type { App as AppContext }

export * from './user'
export * from './role'
export * from './menu'
export * from './tab'
export * from './global'
