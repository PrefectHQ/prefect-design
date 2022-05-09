import { Pixels } from './units'

export type Position = { top?: number, right?: number, bottom?: number, left?: number }

export type PositionStyles = { top?: Pixels, right?: Pixels, bottom?: Pixels, left?: Pixels }

export type PositionMethod = (target: DOMRect, content: DOMRect, container: DOMRect) => Position