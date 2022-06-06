import { App } from 'vue'
import PLabel from './PLabel.vue'

const install = (app: App): void => {
  app.component('PLabel', PLabel)
}

export { PLabel, install }