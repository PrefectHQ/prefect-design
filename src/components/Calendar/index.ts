import { App } from 'vue'
import PCalendar from '@/components/Calendar/PCalendar.vue'

const install = (app: App): void => {
  app.component('PCalendar', PCalendar)
}

export { PCalendar, install }