import { createApp } from 'vue'

// Global and functional styles
import '@/styles/index.css'

import App from './App.vue'
import { plugin } from '@/index'

const app = createApp(App)
app.use(plugin)

app.config.performance = true

app.mount('#app')
