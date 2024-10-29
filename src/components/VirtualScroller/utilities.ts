const scrollers = new Map<string, UseVirtualScroller>()
const noop = (): void => {}

type UseVirtualScroller = {
  makeItemVisible: (itemKey: unknown) => () => void,
  scrollItemIntoView: (itemKey: unknown, options?: ScrollIntoViewOptions) => Promise<void>,
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

    if (!scroller) {
      console.warn(`scroller for ${name} not found while attempting to call makeItemVisible for ${itemKey}`)
    }

    return callback ?? noop
  }

  const scrollItemIntoView: UseVirtualScroller['scrollItemIntoView'] = (itemKey, options) => {
    const scroller = scrollers.get(name)

    if (!scroller) {
      console.warn(`scroller for ${name} not found while attempting to call scrollItemIntoView for ${itemKey}`)
    }

    const callback = scroller?.scrollItemIntoView(itemKey, options)

    return callback ?? Promise.resolve()
  }

  return {
    makeItemVisible,
    scrollItemIntoView,
  }
}
