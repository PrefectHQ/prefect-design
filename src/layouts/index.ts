import { PLayoutDefault, install as installPLayoutDefault } from './PLayoutDefault'
import { PLayoutFull, install as installPLayoutFull } from './PLayoutFull'
import { PLayoutWell, install as installPLayoutWell } from './PLayoutWell'

export {
  PLayoutDefault,
  PLayoutWell,
  PLayoutFull
}

export const layouts = [
  installPLayoutDefault,
  installPLayoutWell,
  installPLayoutFull,
]