import { createApp } from 'vue'

// Global and functional styles
import '@/styles/index.css'

import App from './App.vue'
import PrefectDesign from '@/index'

const app = createApp(App)
app.use(PrefectDesign)

app.config.performance = true


app.mount('#app')
