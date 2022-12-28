import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'

extend([mixPlugin])

export type FillColor = [string, string]

export type MixRatio = [number, number]

export const addColorAlpha = (color: string, alpha: number) =>
  colord(color).alpha(alpha).toHex()

export const useMixinColor = (firstColor: string, secondColor: string, ratio: number) =>
  colord(firstColor).mix(secondColor, ratio).toHex()
