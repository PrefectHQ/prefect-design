import { Section } from '@/demo/router/routeRecords'
import { components } from '@/demo/sections/components'
import { layouts } from '@/demo/sections/layouts'

export const sections: Section = {
  components,
  icons: () => import('./Icons.vue'),
  directives: () => import('./Directives.vue'),
  layouts,
}