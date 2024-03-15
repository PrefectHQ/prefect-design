import { MaybeRefOrGetter, toValue } from 'vue'
import { PositionMethod, Position } from '@/types/position'

export const positionAroundPoint = function(position: MaybeRefOrGetter<{ x: number, y: number }>, method: PositionMethod): PositionMethod {
  return function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
    const { x, y } = toValue(position)
    const targetPosition = new DOMRect(x, y, 0, 0)

    return method(targetPosition, content, container)
  }
}