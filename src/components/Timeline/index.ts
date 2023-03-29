import { App } from 'vue'
import PTimeline from '@/components/Timeline/PTimeline.vue'
import PTimelineItem from '@/components/Timeline/PTimelineItem.vue'
import PTimelinePoint from '@/components/Timeline/PTimelinePoint.vue'

const install = (app: App): void => {
  app.component('PTimeline', PTimeline)
  app.component('PTimelineItem', PTimelineItem)
  app.component('PTimelinePoint', PTimelinePoint)
}

export {
  PTimeline,
  PTimelineItem,
  PTimelinePoint,
  install
}