import { App } from 'vue'
import PTable from './PTable.vue'
import PTableBody from './PTableBody.vue'
import PTableData from './PTableData.vue'
import PTableFoot from './PTableFoot.vue'
import PTableHead from './PTableHead.vue'
import PTableHeader from './PTableHeader.vue'
import PTableRow from './PTableRow.vue'

const install = (app: App): void => {
  app.component('PTable', PTable)
  app.component('PTableHead', PTableHead)
  app.component('PTableBody', PTableBody)
  app.component('PTableHeader', PTableHeader)
  app.component('PTableRow', PTableRow)
  app.component('PTableData', PTableData)
  app.component('PTableFoot', PTableFoot)
}

export {
  PTable,
  PTableBody,
  PTableData,
  PTableFoot,
  PTableHead,
  PTableHeader,
  PTableRow,
  install
}