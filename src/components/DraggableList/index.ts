import { App } from 'vue'
import PDraggableList from '@/components/DraggableList/PDraggableList.vue'

const install = (app: App): void => {
  app.component('PDraggableList', PDraggableList)
}

export { PDraggableList, install }