import { PLayoutDefault, install as installPLayoutDefault } from '@/layouts/PLayoutDefault'
import { PLayoutFull, install as installPLayoutFull } from '@/layouts/PLayoutFull'
import { PLayoutResizable, install as installPLayoutResizable } from '@/layouts/PLayoutResizable'
import { PLayoutToolbarGrid, install as installPLayoutToolbarGrid } from '@/layouts/PLayoutToolbarGrid'
import { PLayoutWell, install as installPLayoutWell } from '@/layouts/PLayoutWell'

export {
  PLayoutDefault,
  PLayoutFull,
  PLayoutResizable,
  PLayoutWell,
  PLayoutToolbarGrid
}

export const layouts = [
  installPLayoutDefault,
  installPLayoutFull,
  installPLayoutResizable,
  installPLayoutWell,
  installPLayoutToolbarGrid,
]