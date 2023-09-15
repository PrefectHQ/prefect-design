import { App } from 'vue'
import PErrorBoundary from '@/components/ErrorBoundary/PErrorBoundary.vue'

const install = (app: App): void => {
  app.component('PErrorBoundary', PErrorBoundary)
}

export { PErrorBoundary, install }