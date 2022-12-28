import { PLayoutDefault, install as installPLayoutDefault } from '@/layouts/PLayoutDefault'
import { PLayoutFull, install as installPLayoutFull } from '@/layouts/PLayoutFull'
import { PLayoutTable, install as installPLayoutTable } from '@/layouts/PLayoutTable'
import { PLayoutWell, install as installPLayoutWell } from '@/layouts/PLayoutWell'

export {
  PLayoutDefault,
  PLayoutFull,
  PLayoutTable,
  PLayoutWell
}

export const layouts = [
  installPLayoutDefault,
  installPLayoutFull,
  installPLayoutTable,
  installPLayoutWell,
]