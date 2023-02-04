import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { MaybeRef } from '@/types/ref'

type DisconnectScrollLink = () => void
type ScrollLinkReturnValue = {
  disconnect: DisconnectScrollLink,
  source: Ref<HTMLElement | undefined>,
  target: Ref<HTMLElement | undefined>,
}

/**
 * The useScrollLinking composition takes 2 optional element references (source, target)
 * and attaches a scroll event listener to the source. When the scroll event of the
 * source element is fired, the scroll position of the target is updated to match, producing
 * a scroll linking effect.
 *
 * This composition will tear down when the calling component is unmounted but can be disconnected
 * early using the returned disconnect method.
 *
 * @param source Ref<HTMLElement>
 * @param target Ref<HTMLElement>
 * @returns ScrollLinkReturnValue
 */
export function useScrollLinking(
  source?: MaybeRef<HTMLElement>,
  target?: MaybeRef<HTMLElement>,
): ScrollLinkReturnValue {
  const sourceRef = ref(source)
  const targetRef = ref(target)

  const handleScroll = (): void => {
    if (!sourceRef.value || !targetRef.value) {
      return
    }

    targetRef.value.scrollTop = sourceRef.value.scrollTop
    targetRef.value.scrollLeft = sourceRef.value.scrollLeft

    sourceRef.value.style.width = `${targetRef.value.scrollWidth}px`
  }

  const connect = (): void => {
    if (!sourceRef.value) {
      return
    }

    sourceRef.value.addEventListener('scroll', handleScroll)
  }

  const disconnect = (): void => {
    if (!sourceRef.value) {
      return
    }

    sourceRef.value.removeEventListener('scroll', handleScroll)
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return {
    disconnect,
    source: sourceRef,
    target: targetRef,
  }
}