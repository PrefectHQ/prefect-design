import { App } from 'vue'
import PWellKeyValue from './PWellKeyValue.vue'

PWellKeyValue.install = (app: App) => {
  app.component('PWellKeyValue', PWellKeyValue)
}

export default PWellKeyValue