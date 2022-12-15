import { App } from 'vue'
import PAutoHeightTransition from '@/components/AutoHeightTransition/PAutoHeightTransition.vue'

const install = (app: App): void => {
  app.component('PAutoHeightTransition', PAutoHeightTransition)
}

export { PAutoHeightTransition, install }