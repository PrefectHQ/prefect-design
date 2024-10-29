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