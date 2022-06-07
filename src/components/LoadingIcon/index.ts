import { App } from 'vue'
import PLoadingIcon from './LoadingIcon.vue'

const install = (app: App): void => {
  app.component('LoadingIcon', PLoadingIcon)
}

export { PLoadingIcon, install }