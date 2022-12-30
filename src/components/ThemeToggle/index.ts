import { App } from 'vue'
import PThemeToggle from '@/components/ThemeToggle/PThemeToggle.vue'

const install = (app: App): void => {
  app.component('PThemeToggle', PThemeToggle)
}

export { PThemeToggle, install }