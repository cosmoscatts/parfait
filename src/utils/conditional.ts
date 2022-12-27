export class Conditional {
  static some(fns: [boolean, Function][]): void {
    fns.some(([f, fn]) => {
      if (f) fn()
      return f
    })
  }

  static someWithValue<R = any>(fns: [boolean, Function][]): R | null {
    for (const [f, fn] of fns) {
      if (!f) continue
      return fn()
    }
    return null
  }

  static each(fns: [boolean, Function][]): void {
    fns.forEach(([f, fn]) => {
      if (f) fn()
    })
  }
}
