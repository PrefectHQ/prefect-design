import { App } from 'vue'
import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'

const install = (app: App): void => {
  app.component('PNativeSelect', PNativeSelect)
}

export { PNativeSelect, install }