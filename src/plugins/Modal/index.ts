import { Plugin } from 'vue'

export const modalTeleportTarget = '#p-modal-teleport-target'

function createTeleportTarget(): void {
  if (document.body.querySelector(modalTeleportTarget)) {
    return
  }

  const element = document.createElement('div')
  element.id = modalTeleportTarget.slice(1)
  document.body.appendChild(element)
}


export const ModalPlugin: Required<Plugin> = {
  install: () => {
    createTeleportTarget()
  },
}
