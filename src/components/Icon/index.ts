import { App } from 'vue'
import PIcon from '@/components/Icon/PIcon.vue'

const install = (app: App): void => {
  app.component('PIcon', PIcon)
}

export { PIcon, install }