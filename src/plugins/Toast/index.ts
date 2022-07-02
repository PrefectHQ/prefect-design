import { App, createApp, reactive, Plugin } from 'vue'
import ToastContainer from '@/components/Toast/ToastContainer.vue'

type ToastType = 'default' | 'success' | 'error'

type Toast = {
  id: number,
  message: string,
  type: ToastType,
  dismissible: boolean,
  timeout: number | false,
  dismiss: () => void,
}

type ToastOptions = {
  dismissible?: boolean,
  timeout?: number | false,
}

type ToastPluginOptions = {
  mountPoint?: Element | string,
}

let toastId = 0
const queue: Toast[] = reactive([])

function getToastId(): number {
  return toastId++
}

function hideToast(id: number): void {
  const index = queue.findIndex(toast => toast.id === id)

  if (index > -1) {
    queue.splice(index, 1)
  }
}

function createDefaultMountElement(): Element {
  const element = document.createElement('div')
  element.id = 'prefect-design-toast-app'
  document.body.appendChild(element)

  return element
}

function tryQuerySelector(query: string): Element {
  const element = document.querySelector(query)

  if (!element) {
    throw new Error(
      "Toast plugin wasn't provided a valid mount point. Make sure the mount point exists in the DOM or pass nothing to create one automatically.",
    )
  }

  return element
}

function getMountElement(mountPoint: Element | string | undefined): Element {
  if (!mountPoint) {
    return createDefaultMountElement()
  }

  if (typeof mountPoint === 'string') {
    return tryQuerySelector(mountPoint)
  }

  return mountPoint
}

function showToast(message: string, type: ToastType = 'default', options?: ToastOptions): Toast {
  const id = getToastId()

  const defaultOptions: Required<ToastOptions> = {
    dismissible: true,
    timeout: 5000,
  }

  const toast: Toast = {
    ...defaultOptions,
    id,
    message,
    type,
    dismiss: () => hideToast(id),
    ...options,
  }

  queue.unshift(toast)

  return toast
}

const ToastPlugin: Required<Plugin> = {
  install: (app: App, options: ToastPluginOptions = {}) => {
    const element = getMountElement(options.mountPoint)

    createApp(ToastContainer).mount(element)

    app.config.globalProperties.$toast = showToast
  },
}

export type { Toast, ToastType, ToastOptions, ToastPluginOptions }
export { ToastPlugin, queue, showToast, hideToast }