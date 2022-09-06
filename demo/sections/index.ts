import { Section } from '../router/routeRecords'
import { components } from './components'
import { layouts } from './layouts'

export const sections: Section = {
  components,
  icons: () => import('./IconsDemo.vue'),
  layouts,
}