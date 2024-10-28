const scrollers = new Map<string, UseVirtualScroller>()
const noop = (): void => {}

type UseVirtualScroller = {
  makeItemVisible: (itemKey: unknown) => () => void,
  scrollItemIntoView: (itemKey: unknown, options?: ScrollIntoViewOptions) => void,
}

export function registerVirtualScroller(name: string, scroller: UseVirtualScroller): void {
  scrollers.set(name, scroller)
}

export function unregisterVirtualScroller(name: string): void {
  scrollers.delete(name)
}

export function getVirtualScroller(name: string): UseVirtualScroller {

  const makeItemVisible: UseVirtualScroller['makeItemVisible'] = (itemKey) => {
    const scroller = scrollers.get(name)
    const callback = scroller?.makeItemVisible(itemKey)

    return callback ?? noop
  }

  const scrollItemIntoView: UseVirtualScroller['scrollItemIntoView'] = (itemKey, options) => {
    const scroller = scrollers.get(name)

    return scroller?.scrollItemIntoView(itemKey, options)
  }

  return {
    makeItemVisible,
    scrollItemIntoView,
  }
}

export function scrollIntoView(target: Element, options?: ScrollIntoViewOptions): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<void>()

  const observer = new IntersectionObserver((entries) => {
    const [entry] = entries

    if (entry.isIntersecting) {
      observer.unobserve(target)
      observer.disconnect()

      setTimeout(() => {
        resolve()
      }, 100)
    }
  })

  observer.observe(target)

  target.scrollIntoView(options)

  return promise
}
