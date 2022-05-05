import { App } from 'vue'
import PTable from './PTable.vue'
import PTableBody from './PTableBody.vue'
import PTableData from './PTableData.vue'
import PTableFoot from './PTableFoot.vue'
import PTableHead from './PTableHead.vue'
import PTableHeader from './PTableHeader.vue'
import PTableRow from './PTableRow.vue'

PTable.install = (app: App) => {
  app.component('PTable', PTable)
}

PTableHead.install = (app: App) => {
  app.component('PTableHead', PTableHead)
}

PTableBody.install = (app: App) => {
  app.component('PTableBody', PTableBody)
}

PTableHeader.install = (app: App) => {
  app.component('PTableHeader', PTableHeader)
}

PTableRow.install = (app: App) => {
  app.component('PTableRow', PTableRow)
}

PTableData.install = (app: App) => {
  app.component('PTableData', PTableData)
}

PTableFoot.install = (app: App) => {
  app.component('PTableFoot', PTableFoot)
}

export {
  PTable,
  PTableBody,
  PTableData,
  PTableFoot,
  PTableHead,
  PTableHeader,
  PTableRow
}

export default PTable