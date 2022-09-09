import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

export type FillColor = [string, string]

export type MixRatio = [number, number]

export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}

export function useMixinColor(firstColor: string, secondColor: string, ratio: number) {
  return colord(firstColor).mix(secondColor, ratio).toHex()
}
