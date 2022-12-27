export interface Menu {
  id: number
  title: string
  path?: string
  icon?: string
  children?: Menu[]
}
