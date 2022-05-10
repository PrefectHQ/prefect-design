import { App } from 'vue'
import PTabWrapper from './PTabWrapper.vue'


PTabWrapper.install = (app: App) => {
  app.component('PTabWrapper', PTabWrapper)
}

export { PTabWrapper }
export default PTabWrapper