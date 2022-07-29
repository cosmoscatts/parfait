import { colord } from 'colord'
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}
