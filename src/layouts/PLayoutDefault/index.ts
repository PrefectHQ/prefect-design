import { App } from 'vue'
import PLayoutDefault from './PLayoutDefault.vue'

const install = (app: App):void => {
  app.component('PLayoutDefault', PLayoutDefault)
}

export default PLayoutDefault