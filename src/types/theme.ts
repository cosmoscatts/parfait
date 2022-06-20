export interface themesItem {
  owners: string[]
  depLibrary: string
  cover: string
  logo: string
  allowFork: boolean
  _id: string
  author: string
  themeName: string
  status: string
  themeId: number
  config: string
  createdAt: string
  updatedAt: string
  __v: number
  packageName: string
  publishStatus: string
  version: string
  primaryColor: string
  ownerInfos: any[]
  unpkgHost: string
}

export interface themesListRes {
  list: Array<themesItem>
  total: number
}

export interface themesListReq {
  pageSize: number
  currentPage: number
  depLibrary: string
}
