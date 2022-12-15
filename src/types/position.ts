import { Ref } from 'vue'
import { Pixels } from '@/types/units'

export type Position = { top: number, left: number }

export type PositionStyles = { top?: Pixels, left?: Pixels, position: 'absolute' }

export type PositionMethod = (target: DOMRect, content: DOMRect, container: DOMRect) => Position

export type UsePositionRefs = {
  target: Ref<Element | undefined>,
  content: Ref<Element | undefined>,
  container: Ref<Element | undefined>,
}

export type UsePosition = {
  position: Position,
} & UsePositionRefs

export type UsePositionStyles = {
  styles: PositionStyles,
} & UsePositionRefs