
import { App } from 'vue'
import PModal from '@/components/Modal/PModal.vue'

const install = (app: App): void => {
  app.component('PModal', PModal)
}

export { PModal, install }