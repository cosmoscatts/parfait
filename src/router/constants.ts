export const BASE_LAYOUT = () => import('~/layouts/index.vue')

export const WHITE_LIST = [
  { name: 'NotFound', children: [] },
  { name: 'ErrorPage', children: [] },
  { name: 'Login', children: [] },
  { name: 'Redirect', children: [] },
  { name: 'Profile', children: [] },
]

export const NOT_FOUND = {
  name: 'NotFound',
}

export const ERROR_PAGE = {
  name: 'ErrorPage',
}
