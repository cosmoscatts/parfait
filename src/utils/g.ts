interface AbsG {
  // Is

  isString: (p: any) => p is string
  isNumber: (p: any) => p is number
  isBoolean: (p: any) => p is boolean
  isObject: (p: any) => boolean
  isArray: (p?: any) => p is any[]
  isUndefined: (p: any) => p is undefined
  isNull: (p: any) => p is null

  // Clone

  clone: <T = any>(obj: T) => T
  deepClone: <T = any>(obj: T) => T

  // Number

  randomNumber: (arr: [number | undefined, number | undefined]) => number

  // String

  blankStr: (str?: string | null) => boolean

  // Object

  emptyObj: <T = any>(obj?: T | null) => boolean
  assignObj: <S extends object, T extends object>(source: S, target: T) => void

  // Array

  emptyArray: <T = any>(list?: T[] | null) => boolean
}

export const G: AbsG = {
  isString(p: any): p is string {
    return typeof p === 'string'
  },

  isNumber(p: any): p is number {
    return typeof p === 'number'
  },

  isBoolean(p: any): p is boolean {
    return typeof p === 'boolean'
  },

  isObject(p: any) {
    if (!p) return false
    return typeof p === 'object' && Array.isArray(p) === false
  },

  isArray(p?: any): p is any[] {
    return Array.isArray(p)
  },

  isUndefined(p: any): p is undefined {
    return typeof p === 'undefined'
  },

  isNull(p: any): p is null {
    return p === null
  },

  clone<T = any>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T
  },

  deepClone<T = any>(obj: T): T {
    return lodash.cloneDeep<T>(obj)
  },

  randomNumber([min = 0, max = 1]: [number | undefined, number | undefined]) {
    let ans = 0
    while (ans <= min) ans = ~~(Math.random() * max)
    return ans
  },

  blankStr(str?: string | null): boolean { // 判断字符串是否为空
    return (str ?? '') === ''
  },

  emptyObj<T = any>(obj?: T | null): boolean { // 判断对象属性是否为空
    if (!obj) return false
    return Object.keys(obj).length > 0
  },

  assignObj<S extends object, T extends object>(
    source: S,
    target: T,
  ): void { // 将 source 中属性的值赋给 target, 排除 target 中不存在的属性
    Object.entries(source).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        target[key as keyof T] = value
      }
    })
  },

  emptyArray<T = any>(list?: T[] | null) { // 判断集合是否为空
    if (!list) return false
    return list.length > 0
  },
}
