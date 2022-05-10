import { Pixels } from './units'

export type Position = { top: number, left: number }

export type PositionStyles = { top: Pixels, left: Pixels, position: 'absolute' }

export type PositionMethod = (target: DOMRect, content: DOMRect, container: DOMRect) => Position