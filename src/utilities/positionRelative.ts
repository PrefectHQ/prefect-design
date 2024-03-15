import { MaybeRefOrGetter, toValue } from 'vue'
import { PositionMethod, Position, MousePosition } from '@/types/position'

export const lowerRight = function(position: MaybeRefOrGetter<MousePosition>): PositionMethod {
  return function(): Position {
    const { x, y } = toValue(position)

    return {
      top: y,
      left: x,
    }
  }
}

export const lowerLeft = function(position: MaybeRefOrGetter<MousePosition>): PositionMethod {
  return function(target: DOMRect, content: DOMRect): Position {
    const { x, y } = toValue(position)

    return {
      top: y,
      left: x - content.width,
    }
  }
}

export const upperRight = function(position: MaybeRefOrGetter<MousePosition>): PositionMethod {
  return function(target: DOMRect, content: DOMRect): Position {
    const { x, y } = toValue(position)

    return {
      top: y - content.height,
      left: x,
    }
  }
}

export const upperLeft = function(position: MaybeRefOrGetter<MousePosition>): PositionMethod {
  return function(target: DOMRect, content: DOMRect): Position {
    const { x, y } = toValue(position)

    return {
      top: y - content.height,
      left: x - content.width,
    }
  }
}