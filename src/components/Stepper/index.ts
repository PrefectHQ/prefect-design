import { App } from 'vue'
import PStepper from '@/components/Stepper/PStepper.vue'


const install = (app: App): void => {
  app.component('PStepper', PStepper)
}

export { PStepper, install }