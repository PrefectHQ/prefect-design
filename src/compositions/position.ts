/* eslint-disable max-params */
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref, Ref, watch, watchEffect } from 'vue'
import { Position, PositionMethod, PositionStyles, UsePosition, UsePositionRefs, UsePositionStyles } from '@/types/position'
import { toPixels } from '@/utilities/units'

export function usePosition(
  placement: Ref<PositionMethod> | PositionMethod,
  refs?: Partial<UsePositionRefs>,
): UsePosition {
  const target = refs?.target ?? ref<Element | undefined>()
  const content = refs?.content ?? ref<Element | undefined>()
  const container = refs?.container ?? ref<Element | undefined>()
  const placementRef = ref(placement)
  const position = reactive({} as Position)
  const observer = new ResizeObserver(update)

  function update(): void {
    if (target.value && content.value && container.value) {
      const newPosition = getPosition(target.value, content.value, container.value, placementRef.value)

      Object.assign(position, newPosition)
    }
  }

  useOnMountedIfComponentIsDetected(() => {
    watchEffect(update)
    observeTemplateRefs(observer, [target, content, container])
  })

  useOnUnmountedIfComponentIsDetected(() => observer.disconnect())

  return {
    target,
    content,
    container,
    position,
  }
}

export function usePositionStyles(
  placement: Ref<PositionMethod> | PositionMethod,
  refs?: Partial<UsePositionRefs>,
): UsePositionStyles {
  const { target, content, container, position } = usePosition(placement, refs)
  const styles = reactive({} as PositionStyles)

  watchEffect(() => Object.assign(styles, mapPositionToPositionStyles(position)))

  return {
    target,
    content,
    container,
    styles,
  }
}

export function useMostVisiblePosition(
  placements: Ref<PositionMethod[]> | PositionMethod[],
  refs?: Partial<UsePositionRefs>,
): UsePosition {
  const target = refs?.target ?? ref<Element | undefined>()
  const content = refs?.content ?? ref<Element | undefined>()
  const container = refs?.container ?? ref<Element | undefined>()
  const placementsRef = ref(placements)
  const position = reactive({} as Position)
  const observer = new ResizeObserver(update)

  function update(): void {
    if (target.value && content.value && container.value && placementsRef.value.length > 0) {
      const positions = placementsRef.value.map(placement => usePosition(placement, { target, content, container }))
      // eslint-disable-next-line id-length
      const positionsSortedByVisibility = [...positions].sort((a, b) => sortPositionsByVisibility(content.value!, container.value!, a.position, b.position))
      const [mostVisiblePosition] = positionsSortedByVisibility

      Object.assign(position, mostVisiblePosition.position)
    }
  }

  useOnMountedIfComponentIsDetected(() => {
    watchEffect(update)
    observeTemplateRefs(observer, [target, content, container])
  })

  useOnUnmountedIfComponentIsDetected(() => observer.disconnect())

  return {
    target,
    content,
    container,
    position,
  }
}

export function useMostVisiblePositionStyles(
  placements: Ref<PositionMethod[]> | PositionMethod[],
  refs?: Partial<UsePositionRefs>,
): UsePositionStyles {
  const { target, content, container, position } = useMostVisiblePosition(placements, refs)
  const styles = reactive({} as PositionStyles)

  watchEffect(() => Object.assign(styles, mapPositionToPositionStyles(position)))

  return {
    target,
    content,
    container,
    styles,
  }
}

function getPositionVisibility(content: Element, container: Element, position: Position): number {
  const rect = getDomRectForPosition(content, container, position)
  const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
  const visibleArea = visibleWidth * visibleHeight
  const totalArea = rect.width * rect.height

  return visibleArea / totalArea
}

function getDomRectForPosition(content: Element, container: Element, position: Position): DOMRect {
  const { width, height } = content.getBoundingClientRect()
  const { left, top } = container.getBoundingClientRect()

  return new DOMRect(position.left + left, position.top + top, width, height)
}

function observerCallback(observer: ResizeObserver, newElement: Element | undefined, oldElement: Element | undefined): void {
  if (newElement) {
    observer.observe(newElement)
  }

  if (oldElement) {
    observer.unobserve(oldElement)
  }
}

function useOnMountedIfComponentIsDetected(callback: () => void): void {
  if (getCurrentInstance()) {
    onMounted(callback)
  } else {
    callback()
  }
}

function useOnUnmountedIfComponentIsDetected(callback: () => void): void {
  if (getCurrentInstance()) {
    onUnmounted(callback)
  }
}

function getPosition(
  target: Element,
  content: Element,
  container: Element,
  placement: PositionMethod,
): Position {
  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const position = placement(targetRect, contentRect, containerRect)

  return position
}

function sortPositionsByVisibility(content: Element, container: Element, positionA: Position, positionB: Position): 0 | 1 | -1 {
  const aVisibility = getPositionVisibility(content, container, positionA)
  const bVisibility = getPositionVisibility(content, container, positionB)

  if (bVisibility === aVisibility) {
    return 0
  }

  if (bVisibility > aVisibility) {
    return 1
  }

  return -1
}

function mapPositionToPositionStyles(position: Partial<Position>): PositionStyles {
  return {
    top: position.top ? toPixels(position.top) : undefined,
    left: position.left ? toPixels(position.left) : undefined,
    position: 'absolute',
  }
}

function observeTemplateRefs(observer: ResizeObserver, refs: Ref<Element | undefined>[]): void {
  refs.forEach(ref => {
    watch(ref, (newRef, oldRef) => observerCallback(observer, newRef, oldRef), { immediate: true })
  })
}