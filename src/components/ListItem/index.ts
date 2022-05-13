import { App } from 'vue'
import PListItem from './PListItem.vue'

PListItem.install = (app: App) => {
  app.component('PListItem', PListItem)
}

export default PListItem