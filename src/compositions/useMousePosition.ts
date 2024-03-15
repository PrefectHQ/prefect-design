import { useGlobalEventListener } from '@prefecthq/vue-compositions'
import { reactive } from 'vue'
import { MousePosition } from '@/types/position'

export type UseMousePosition = {
  position: MousePosition,
  positionAtLastClick: MousePosition,
}

const position = reactive<MousePosition>({ x: 0, y: 0 })
const positionAtLastClick = reactive<MousePosition>({ x: 0, y: 0 })

const updatePositionAtLastClick = (): void => {
  Object.assign(positionAtLastClick, position)
}

const updateMousePosition = (event: MouseEvent): void => {
  position.x = event.clientX
  position.y = event.clientY

  if (positionAtLastClick.x === 0 && positionAtLastClick.y === 0) {
    updatePositionAtLastClick()
  }
}

useGlobalEventListener('mousemove', updateMousePosition, { passive: true })
useGlobalEventListener('click', updatePositionAtLastClick, { capture: true })
useGlobalEventListener('contextmenu', updatePositionAtLastClick, { capture: true })

export function useMousePosition(): UseMousePosition {
  return {
    position,
    positionAtLastClick,
  }
}