import { App } from 'vue'
import POrderedList from '@/components/OrderedList/POrderedList.vue'
import POrderedListItem from '@/components/OrderedList/POrderedListItem.vue'
import POrderedListNode from '@/components/OrderedList/POrderedListNode.vue'

const install = (app: App): void => {
  app.component('POrderedList', POrderedList)
  app.component('POrderedListItem', POrderedListItem)
  app.component('POrderedListNode', POrderedListNode)
}

export {
  POrderedList,
  POrderedListItem,
  POrderedListNode,
  install
}