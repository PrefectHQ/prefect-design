import { App } from 'vue'
import PTag from './PTag.vue'


PTag.install = (app: App) => {
  app.component('PTag', PTag)
}

export { PTag }
export default PTag