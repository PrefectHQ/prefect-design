// Sadly {} is the type vue wants for a slot with no scope (props)
/* eslint-disable @typescript-eslint/ban-types */
export type AccordionSlots<T extends Readonly<string[]>> = {
  [K in T[number] as `${K}-heading`]?: (props: {}) => unknown
} & {
  [K in T[number] as `${K}-content`]?: (props: {}) => unknown
} & {
  content?: (props: { section: T[number] }) => unknown,
  heading?: (props: { section: T[number] }) => unknown,
}