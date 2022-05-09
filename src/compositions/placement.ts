/* eslint-disable max-params */
import { computed, getCurrentInstance, onMounted, reactive, Ref, watch, watchEffect } from 'vue'
import { Position, PositionMethod, PositionStyles } from '@/types/position'

const emptyPosition = {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined,
}

export function usePosition(target: Ref<HTMLElement>, content: Ref<HTMLElement>, container: Ref<HTMLElement>, placement: Ref<PositionMethod>): Position {
  const position = reactive({} as Position)
  const update = (): void => updatePosition(position, target.value, content.value, container.value, placement.value)
  const observer = new ResizeObserver(update)

  useOnMountedIfComponentIsDetected(() => {
    watchEffect(() => update())

    watch(target, (newTarget, oldTarget) => observerCallback(observer, newTarget, oldTarget), { immediate: true })
    watch(content, (newContent, oldContent) => observerCallback(observer, newContent, oldContent), { immediate: true })
    watch(container, (newContainer, oldContainer) => observerCallback(observer, newContainer, oldContainer), { immediate: true })
  })

  return position
}

export function usePositionStyles(target: Ref<HTMLElement>, content: Ref<HTMLElement>, container: Ref<HTMLElement>, placement: Ref<PositionMethod>): Ref<PositionStyles> {
  const position = usePosition(target, content, container, placement)

  return computed(() => {
    const keys = Object.keys(position)
    const styles: PositionStyles = { position: 'absolute' }

    keys.forEach(key => {
      const property = key as keyof Position
      const value = position[property]

      if (value !== undefined) {
        styles[property] = `${value}px`
      }
    })

    return styles
  })
}

function observerCallback(observer: ResizeObserver, newElement: HTMLElement, oldElement: HTMLElement | undefined): void {
  observer.observe(newElement)

  if (oldElement) {
    observer.unobserve(oldElement)
  }
}

export function useOnMountedIfComponentIsDetected(callback: () => void): void {
  if (getCurrentInstance()) {
    onMounted(callback)
  } else {
    callback()
  }
}

export function getPosition(
  target: HTMLElement,
  content: HTMLElement,
  container: HTMLElement,
  placement: PositionMethod,
): Position {
  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const position = placement(targetRect, contentRect, containerRect)

  return position
}

export function updatePosition(
  position: Position,
  target: HTMLElement,
  content: HTMLElement,
  container: HTMLElement,
  placement: PositionMethod,
): void {
  const newPosition = getPosition(target, content, container, placement)

  Object.assign(position, emptyPosition, newPosition)
}