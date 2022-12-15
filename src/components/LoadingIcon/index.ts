import { App } from 'vue'
import PLoadingIcon from '@/components/LoadingIcon/PLoadingIcon.vue'

const install = (app: App): void => {
  app.component('PLoadingIcon', PLoadingIcon)
}

export { PLoadingIcon, install }