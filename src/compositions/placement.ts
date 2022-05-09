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

  watchEffect(() => Object.assign(position, emptyPosition, getPosition(target.value, content.value, container.value, placement.value)))

  return position
}

export function usePositionStyles(target: Ref<HTMLElement>, content: Ref<HTMLElement>, container: Ref<HTMLElement>, placement: Ref<PositionMethod>): Ref<PositionStyles> {
  const position = usePosition(target, content, container, placement)

  return computed(() => {
    const keys = Object.keys(position)
    const styles: PositionStyles = {}

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
  target: HTMLElement,
  content: HTMLElement,
  container: HTMLElement,
  placement: PositionMethod,
): Position {
  if (target === undefined) {
    console.warn('target is undefined')
  }
  if (content === undefined) {
    console.warn('content is undefined')
  }
  if (container === undefined) {
    console.warn('container is undefined')
  }

  if (!target || !content || !container) {
    return {} as Position
  }

  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const position = placement(targetRect, contentRect, containerRect)

  console.log({ position })

  return position
}