import { App } from 'vue'
import PStepper from './PStepper.vue'


const install = (app: App): void => {
  app.component('PStepper', PStepper)
}

export { PStepper, install }