import { App } from 'vue'
import PButton from '@/components/Button/PButton.vue'

const install = (app: App): void => {
  app.component('PButton', PButton)
}

export { PButton, install }