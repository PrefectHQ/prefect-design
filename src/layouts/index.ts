import { default as PDefaultLayout } from './PDefaultLayout'
import { default as PFullLayout } from './PFullLayout'
import { default as PWellLayout } from './PWellLayout'

export {
  PDefaultLayout,
  PWellLayout,
  PFullLayout
}

export const layouts = [
  PDefaultLayout.install,
  PWellLayout.install,
  PFullLayout.install,
]