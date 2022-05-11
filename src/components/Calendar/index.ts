import { App } from 'vue'
import PCalendar from './PCalendar.vue'

PCalendar.install = (app: App) => {
  app.component('PCalendar', PCalendar)
}

export default PCalendar