import { plugin } from '@/index'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// Global and functional styles
import '../src/styles/index.css'

const app = createApp(App)
app.use(plugin)
app.use(router)

app.config.performance = true

app.mount('#app')
