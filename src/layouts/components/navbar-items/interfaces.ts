export interface BellData {
  title: string
  date: Date
}

export type BellDataType = 'notification' | 'message' | 'todo'

export interface BellTabData {
  name: string
  color: string
  type: BellDataType
}
