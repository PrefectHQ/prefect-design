import { Ref } from 'vue'
import { Pixels } from './units'

export type Position = { top: number, left: number }

export type PositionStyles = { top: Pixels, left: Pixels, position: 'absolute' }

export type PositionMethod = (target: DOMRect, content: DOMRect, container: DOMRect) => Position

export type UsePositionRefs = {
  target: Ref<HTMLElement | undefined>,
  content: Ref<HTMLElement | undefined>,
  container: Ref<HTMLElement | undefined>,
}

export type UsePosition = {
  position: Position,
} & UsePositionRefs

export type UsePositionStyles = {
  styles: PositionStyles,
} & UsePositionRefs