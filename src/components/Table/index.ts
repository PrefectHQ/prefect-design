import { App } from 'vue'
import PTable from './PTable.vue'

PTable.install = (app: App) => {
  app.component('PTable', PTable)
}

export default PTable