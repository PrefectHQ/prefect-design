import { convertToPremoji } from '@/compositions/usePremoji'
import { plugin } from '@/index'
import { createApp, ref } from 'vue'
import App from './App.vue'
import { router } from './router'


const app = createApp(App)
app.use(plugin)
app.use(router)

app.directive('premoji', (el) => {
  const elementNode = el.firstChild.textContent
  const parentNode = ref(el.parentNode)

  if (parentNode.value) {
    parentNode.value.innerHTML = convertToPremoji(elementNode)
  }
})

app.config.performance = true

app.mount('#app')
