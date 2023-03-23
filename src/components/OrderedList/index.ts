import { App } from 'vue'
import POrderedList from '@/components/OrderedList/POrderedList.vue'

const install = (app: App): void => {
  app.component('POrderedList', POrderedList)
}

export { POrderedList, install }