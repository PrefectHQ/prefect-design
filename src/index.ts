import fs, { cp } from 'fs'
import path from 'path'
import { App } from 'vue'

import Button from '@/components/Button'

const components = { Button }

// const componentDirectory = './components'

const install = async (app: App): Promise<void> => {

  for (const component in components) {
    console.log(components[component])
    if (components[component].install) {
      components[component].install(app)
    }
  }

  // const loadComponents: Promise<{ install?: (app: App) => void }>[] = fs.readdirSync(componentDirectory, { withFileTypes: true })
  //   .filter(file => !file.isDirectory())
  //   .map(file => import(path.join(__dirname, file.name, '/index.ts')))

  // const components = await Promise.all(loadComponents)

  // for (const component of components) {
  //   if (component.install) {
  //     component.install(app)
  //   }
  // }

  // for (const component in components) {
  //   // @ts-expect-error
  //   if (components[component].install) {
  //     // @ts-expect-error
  //     components[component].install(app)
  //   } else {
  //     // @ts-expect-error
  //     app.component(components[component].name, components[component])
  //   }
  // }

  // for (const directive in directives) {
  // // @ts-expect-error
  //   app.directive(directive, directives[directive])
  // }

  // for (const plugin in plugins) {
  // // @ts-expect-error
  //   app.use(plugins[plugin])
  // }
}

export default install
