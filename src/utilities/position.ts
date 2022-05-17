import { PositionMethod, Position } from '@/types/position'

export const top: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top - content.height
  const left = target.left - container.left + target.width / 2 - content.width / 2

  return {
    top,
    left,
  }
}

export const right: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top - content.height / 2 + target.height / 2
  const left = target.left - container.left + target.width

  return {
    top,
    left,
  }
}

export const bottom: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top + target.height
  const left = target.left - container.left + target.width / 2 - content.width / 2

  return {
    top,
    left,
  }
}

export const left: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top - content.height / 2 + target.height / 2
  const left = target.left - container.left - content.width

  return {
    top,
    left,
  }
}

export const topRight: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top - content.height
  const left = target.right - container.left - content.width

  return {
    top,
    left,
  }
}

export const bottomRight: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top + target.height
  const left = target.right - container.left - content.width

  return {
    top,
    left,
  }
}

export const topLeft: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top - content.height
  const left = target.right - container.left - target.width

  return {
    top,
    left,
  }
}

export const bottomLeft: PositionMethod = function(target: DOMRect, content: DOMRect, container: DOMRect): Position {
  const top = target.top - container.top + target.height
  const left = target.right - container.left - target.width

  return {
    top,
    left,
  }
}