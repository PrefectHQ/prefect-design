import { App } from 'vue'
import PTextInput from '@/components/TextInput/PTextInput.vue'

const install = (app: App): void => {
  app.component('PTextInput', PTextInput)
}

export { PTextInput, install }