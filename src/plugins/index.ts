import { ModalPlugin } from '@/plugins/Modal'
import { ToastPlugin } from '@/plugins/Toast'
export * from './Toast'

export const plugins = [ToastPlugin.install, ModalPlugin.install]