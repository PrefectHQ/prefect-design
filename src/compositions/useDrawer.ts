import { useBoolean } from '@prefecthq/vue-compositions'
import { computed, MaybeRef, Ref } from 'vue'

type UseDrawer = {
  value: Ref<boolean>,
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

/**
 * `useDrawer` is a utility composition for managing the state of the `PDrawer` component.
 * It returns an object with `value`, `isOpen`, `open`, `close`, and `toggle` properties.
 *
 * @param {Ref<boolean>} [valueRef] - Optional parameter. A Vue ref object that holds the initial state of the drawer.
 *
 * @returns {UseDrawer} - An object with the following properties:
 *                        `value`: a Vue ref object that holds the current state of the drawer.
 *                        `isOpen`: a computed property that reflects the current state of the drawer.
 *                        `open`: a method to open the drawer.
 *                        `close`: a method to close the drawer.
 *                        `toggle`: a method to toggle the state of the drawer.
 *
 * @example
 * const { open, close, isOpen } = useDrawer()
 * open() // open the drawer
 * close() // close the drawer
 * console.log(isOpen.value); // check if the drawer is open
 */
export function useDrawer(valueRef?: MaybeRef<boolean>): UseDrawer {
  const { value, toggle, setTrue, setFalse } = useBoolean(valueRef)

  const isOpen = computed<boolean>(() => value.value)

  return { value, isOpen, open: setTrue, close: setFalse, toggle }
}

