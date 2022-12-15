import { App } from 'vue'
import PDivider from '@/components/Divider/PDivider.vue'

const install = (app: App): void => {
  app.component('PDivider', PDivider)
}

export { PDivider, install }