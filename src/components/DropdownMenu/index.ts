import { App } from 'vue'
import PDropdownMenu from '@/components/DropdownMenu/PDropdownMenu.vue'
import PDropdownMenuItem from '@/components/DropdownMenu/PDropdownMenuItem.vue'

const installPDropdownMenuItem = (app: App): void => {
  app.component('PDropdownMenuItem', PDropdownMenuItem)
}

const installPDropdownMenu = (app: App): void => {
  app.component('PDropdownMenu', PDropdownMenu)
}

export { PDropdownMenu, PDropdownMenuItem, installPDropdownMenuItem, installPDropdownMenu }