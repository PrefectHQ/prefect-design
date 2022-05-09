/* eslint-disable max-params */
import { computed, reactive, Ref, watchEffect } from 'vue'
import { Position, PositionMethod, PositionStyles } from '@/types/position'

const emptyPosition = {
  left: undefined,
  right: undefined,
  top: undefined,
  bottom: undefined,
}

export function usePosition(target: Ref<HTMLElement>, content: Ref<HTMLElement>, container: Ref<HTMLElement>, placement: Ref<PositionMethod>): Position {
  const position = reactive({} as Position)

  watchEffect(() => {
    const newPosition = getPosition(target.value, content.value, container.value, placement.value)

    Object.assign(position, emptyPosition, newPosition)
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

export function getPosition(
  target: HTMLElement | undefined,
  content: HTMLElement | undefined,
  container: HTMLElement | undefined,
  placement: PositionMethod,
): Position {
  if (!target || !content || !container) {
    return {} as Position
  }

  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const position = placement(targetRect, contentRect, containerRect)

  return position
}