import { App } from 'vue'
import PCodeFile from '@/components/CodeFile/PCodeFile.vue'

const install = (app: App): void => {
  app.component('PCodeFile', PCodeFile)
}

export { PCodeFile, install }