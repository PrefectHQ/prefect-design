import { App } from 'vue'
import PTable from '@/components/Table/PTable.vue'
import PTableBody from '@/components/Table/PTableBody.vue'
import PTableData from '@/components/Table/PTableData.vue'
import PTableFoot from '@/components/Table/PTableFoot.vue'
import PTableHead from '@/components/Table/PTableHead.vue'
import PTableHeader from '@/components/Table/PTableHeader.vue'
import PTableRow from '@/components/Table/PTableRow.vue'

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