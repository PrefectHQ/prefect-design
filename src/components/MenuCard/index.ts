import { App } from 'vue'
import PMenuCard from './PMenuCard.vue'

PMenuCard.install = (app: App) => {
  app.component('PMenuCard', PMenuCard)
}

export default PMenuCard