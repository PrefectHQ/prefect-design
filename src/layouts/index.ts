import { default as PLayoutDefault } from './PLayoutDefault'
import { default as PLayoutFull } from './PLayoutFull'
import { default as PLayoutWell } from './PLayoutWell'

export {
  PLayoutDefault,
  PLayoutWell,
  PLayoutFull
}

export const layouts = [
  PLayoutDefault.install,
  PLayoutWell.install,
  PLayoutFull.install,
]