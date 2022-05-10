/* eslint-disable max-params */
import { computed, getCurrentInstance, onMounted, onUnmounted, reactive, ref, Ref, watch, watchEffect } from 'vue'
import { Position, PositionMethod, PositionStyles } from '@/types/position'
import { refValueIsDefined } from '@/utilities/reactivity'
import { toPixels } from '@/utilities/units'

export function usePosition(
  target: Ref<HTMLElement | undefined> | HTMLElement,
  content: Ref<HTMLElement | undefined> | HTMLElement,
  container: Ref<HTMLElement | undefined> | HTMLElement,
  placement: Ref<PositionMethod> | PositionMethod,
): Position {
  const targetRef = ref(target)
  const contentRef = ref(content)
  const containerRef = ref(container)
  const placementRef = ref(placement)
  const position = reactive({} as Position)
  const observer = new ResizeObserver(update)

  function update(): void {
    if (refValueIsDefined(targetRef) && refValueIsDefined(contentRef) && refValueIsDefined(containerRef)) {
      const newPosition = getPosition(targetRef.value, contentRef.value, containerRef.value, placementRef.value)

      Object.assign(position, newPosition)
    }
  }

  useOnMountedIfComponentIsDetected(() => {
    watchEffect(update)

    watch(targetRef, (newTarget, oldTarget) => observerCallback(observer, newTarget, oldTarget), { immediate: true })
    watch(contentRef, (newContent, oldContent) => observerCallback(observer, newContent, oldContent), { immediate: true })
    watch(containerRef, (newContainer, oldContainer) => observerCallback(observer, newContainer, oldContainer), { immediate: true })
  })

  useOnUnmountedIfComponentIsDetected(observer.disconnect)

  return position
}

export function usePositionStyles(
  target: Ref<HTMLElement | undefined> | HTMLElement,
  content: Ref<HTMLElement | undefined> | HTMLElement,
  container: Ref<HTMLElement | undefined> | HTMLElement,
  placement: Ref<PositionMethod> | PositionMethod,
): Ref<PositionStyles> {
  const position = usePosition(target, content, container, placement)

  return computed(() => mapPositionToPositionStyles(position))
}

export function useMostVisiblePosition(
  target: Ref<HTMLElement | undefined> | HTMLElement,
  content: Ref<HTMLElement | undefined> | HTMLElement,
  container: Ref<HTMLElement | undefined> | HTMLElement,
  placements: Ref<PositionMethod[]> | PositionMethod[],
): Position {
  const targetRef = ref(target)
  const contentRef = ref(content)
  const containerRef = ref(container)
  const placementsRef = ref(placements)
  const position = reactive({} as Position)
  const observer = new ResizeObserver(update)

  function update(): void {
    if (refValueIsDefined(targetRef) && refValueIsDefined(contentRef) && refValueIsDefined(containerRef)) {
      const positions = placementsRef.value.map(placement => usePosition(targetRef, contentRef, containerRef, placement))
      // eslint-disable-next-line id-length
      const positionsSortedByVisibility = [...positions].sort((a, b) => sortPositionsByVisibility(contentRef.value, containerRef.value, a, b))
      const [mostVisiblePosition] = positionsSortedByVisibility

      Object.assign(position, mostVisiblePosition)
    }
  }

  useOnMountedIfComponentIsDetected(() => {
    watchEffect(update)

    watch(targetRef, (newTarget, oldTarget) => observerCallback(observer, newTarget, oldTarget), { immediate: true })
    watch(contentRef, (newContent, oldContent) => observerCallback(observer, newContent, oldContent), { immediate: true })
    watch(containerRef, (newContainer, oldContainer) => observerCallback(observer, newContainer, oldContainer), { immediate: true })
  })

  useOnUnmountedIfComponentIsDetected(observer.disconnect)

  return position
}

export function useMostVisiblePositionStyles(
  target: Ref<HTMLElement> | HTMLElement,
  content: Ref<HTMLElement> | HTMLElement,
  container: Ref<HTMLElement> | HTMLElement,
  placements: Ref<PositionMethod[]> | PositionMethod[],
): Ref<PositionStyles> {
  const mostVisiblePosition = useMostVisiblePosition(target, content, container, placements)

  return computed(() => mapPositionToPositionStyles(mostVisiblePosition))
}

function getPositionVisibility(content: HTMLElement, container: HTMLElement, position: Position): number {
  const rect = getDomRectForPosition(content, container, position)
  const visibleWidth = Math.min(rect.right, window.scrollX + window.innerWidth) - Math.max(rect.left, 0)
  const visibleHeight = Math.min(rect.bottom, window.scrollY + window.innerHeight) - Math.max(rect.top, 0)
  const visibleArea = visibleWidth * visibleHeight
  const totalArea = rect.width * rect.height

  return visibleArea / totalArea
}

function getDomRectForPosition(content: HTMLElement, container: HTMLElement, position: Position): DOMRect {
  const { width, height } = content.getBoundingClientRect()
  const { left, top } = container.getBoundingClientRect()

  return new DOMRect(position.left + left, position.top + top, width, height)
}

function observerCallback(observer: ResizeObserver, newElement: HTMLElement | undefined, oldElement: HTMLElement | undefined): void {
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
  target: HTMLElement,
  content: HTMLElement,
  container: HTMLElement,
  placement: PositionMethod,
): Position {
  const targetRect = target.getBoundingClientRect()
  const contentRect = content.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const position = placement(targetRect, contentRect, containerRect)

  return position
}

function sortPositionsByVisibility(content: HTMLElement, container: HTMLElement, positionA: Position, positionB: Position): 0 | 1 | -1 {
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

function mapPositionToPositionStyles(position: Position): PositionStyles {
  return {
    top: toPixels(position.top),
    left: toPixels(position.left),
    position: 'absolute',
  }
}