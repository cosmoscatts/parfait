import { TOKEN_KEY } from '~/config'
import { cryptoDecode, cryptoEncode } from '~/utils'

export const Token = {
  get: () => {
    const token = localStorage.getItem(TOKEN_KEY)
    return token
      ? cryptoDecode(token)
      : null
  },
  set: (token: string) => localStorage.setItem(TOKEN_KEY, cryptoEncode(token)),
  remove: () => localStorage.removeItem(TOKEN_KEY),
}
