import { PLayoutDefault, install as installPLayoutDefault } from '@/layouts/PLayoutDefault'
import { PLayoutFull, install as installPLayoutFull } from '@/layouts/PLayoutFull'
import { PLayoutResizable, install as installPLayoutResizable } from '@/layouts/PLayoutResizable'
import { PLayoutWell, install as installPLayoutWell } from '@/layouts/PLayoutWell'

export {
  PLayoutDefault,
  PLayoutFull,
  PLayoutResizable,
  PLayoutWell
}

export const layouts = [
  installPLayoutDefault,
  installPLayoutFull,
  installPLayoutResizable,
  installPLayoutWell,
]