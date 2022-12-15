import { App } from 'vue'
import PListItem from '@/components/ListItem/PListItem.vue'

const install = (app: App): void => {
  app.component('PListItem', PListItem)
}

export { PListItem, install }