import { useBoolean } from '@prefecthq/vue-compositions'
import { computed, Ref } from 'vue'

type UseDrawer = {
  value: Ref<boolean>,
  isVisble: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

/**
 * `useModal` is a utility composition for managing the state of the `PModal` component.
 * It returns an object with `value`, `isVisible`, `open`, `close`, `show`, `hide`, and `toggle` properties.
 *
 * @param {Ref<boolean>} [valueRef] - Optional parameter. A Vue ref object that holds the initial state of the modal.
 *
 * @returns {UseDrawer} - An object with the following properties:
 *                        `value`: a Vue ref object that holds the current state of the modal.
 *                        `isVisible`: a computed property that reflects the current state of the modal.
 *                        `open`: open the modal.
 *                        `close`: close the modal.
 *                        `toggle`: a method to toggle the state of the modal.
 *
 * @example
 * const { open, close, isVisible } = useModal()
 * open() // open the modal
 * close() // close the modal
 * console.log(isVisible.value) // check if the modal is visible
 */
export function useModal(valueRef?: Ref<boolean>): UseDrawer {
  const { value, toggle, setTrue, setFalse } = useBoolean(valueRef)

  const isVisble = computed<boolean>(() => value.value)

  return { value, isVisble, open: setTrue, close: setFalse, toggle }
}

