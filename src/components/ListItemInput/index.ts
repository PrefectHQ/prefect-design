import { App } from 'vue'
import PListItemInput from '@/components/ListItemInput/PListItemInput.vue'

const install = (app: App): void => {
  app.component('PListItemInput', PListItemInput)
}

export { PListItemInput, install }