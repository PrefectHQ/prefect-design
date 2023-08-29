import { Section } from '@/demo/router/routeRecords'
import { components } from '@/demo/sections/components'
import { layouts } from '@/demo/sections/layouts'

export const sections: Section = {
  components,
  'Design Tokens': () => import('./DesignTokens.vue'),
  icons: () => import('./Icons.vue'),
  layouts,
}