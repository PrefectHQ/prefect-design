import { App } from 'vue'
import PCommand from '@/components/Command/PCommand.vue'
import PCommandBase from '@/components/Command/PCommandBase.vue'
import PCommandDialog from '@/components/Command/PCommandDialog.vue'
import PCommandEmpty from '@/components/Command/PCommandEmpty.vue'
import PCommandGroup from '@/components/Command/PCommandGroup.vue'
import PCommandInput from '@/components/Command/PCommandInput.vue'
import PCommandItem from '@/components/Command/PCommandItem.vue'
import PCommandList from '@/components/Command/PCommandList.vue'
import PCommandSeparator from '@/components/Command/PCommandSeparator.vue'
import PCommandShortcut from '@/components/Command/PCommandShortcut.vue'

const install = (app: App): void => {
  app.component('PCommand', PCommand)
}

const installPCommandBase = (app: App): void => {
  app.component('PCommandBase', PCommandBase)
}

const installPCommandDialog = (app: App): void => {
  app.component('PCommandDialog', PCommandDialog)
}

const installPCommandEmpty = (app: App): void => {
  app.component('PCommandEmpty', PCommandEmpty)
}

const installPCommandGroup = (app: App): void => {
  app.component('PCommandGroup', PCommandGroup)
}

const installPCommandInput = (app: App): void => {
  app.component('PCommandInput', PCommandInput)
}

const installPCommandItem = (app: App): void => {
  app.component('PCommandItem', PCommandItem)
}

const installPCommandList = (app: App): void => {
  app.component('PCommandList', PCommandList)
}

const installPCommandSeparator = (app: App): void => {
  app.component('PCommandSeparator', PCommandSeparator)
}

const installPCommandShortcut = (app: App): void => {
  app.component('PCommandShortcut', PCommandShortcut)
}

export { PCommand, install, PCommandBase, installPCommandBase, PCommandDialog, installPCommandDialog, PCommandEmpty, installPCommandEmpty, PCommandGroup, installPCommandGroup, PCommandInput, installPCommandInput, PCommandItem, installPCommandItem, PCommandList, installPCommandList, PCommandSeparator, installPCommandSeparator, PCommandShortcut, installPCommandShortcut }