import { App } from 'vue'
import PForm from '@/components/Form/PForm.vue'

const install = (app: App): void => {
  app.component('PForm', PForm)
}

export { PForm, install }