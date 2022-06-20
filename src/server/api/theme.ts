import type { themesListReq } from '~/types'

export function fetchThemesList(params: themesListReq) {
  const urlPrefix = 'https://vue-pro.arco.design/official-api/themes/api/open/themes/list'
  const url = [urlPrefix, '?', Object.entries(params).reduce((preValue: string[], curValue) => {
    const [key, value] = curValue
    return [...preValue, `${key}=${value}`]
  }, []).join('&'),
  ].join('')
  return useFetch(url)
}
