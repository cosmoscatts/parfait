const KEY_PREFIX = 'PARFAIT'
const KEY_MAP = {
  token: 'TOKEN',
  settings: 'SETTINGS',
  tabs: 'TABS',
  themeMode: 'THEME_MODE',
}

const genereateKey = () => Object
  .values(KEY_MAP)
  .map(value => [KEY_PREFIX, value].join('_'))

const [
  TOKEN_KEY,
  SETTINGS_KEY,
  TABS_KEY,
  THEME_MODE_KEY,
] = genereateKey()

export {
  TOKEN_KEY,
  SETTINGS_KEY,
  TABS_KEY,
  THEME_MODE_KEY,
}
