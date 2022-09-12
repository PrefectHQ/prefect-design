import { App } from 'vue'
import PLoadingIcon from './PLoadingIcon.vue'

const install = (app: App): void => {
  app.component('PLoadingIcon', PLoadingIcon)
}

export { PLoadingIcon, install }