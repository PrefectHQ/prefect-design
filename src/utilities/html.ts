export function isHtmlElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement
}