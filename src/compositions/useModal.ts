import { useBoolean } from '@prefecthq/vue-compositions'
import { computed, MaybeRef, Ref } from 'vue'

type UseModal = {
  value: Ref<boolean>,
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

/**
 * `useModal` is a utility composition for managing the state of the `PModal` component.
 * It returns an object with `value`, `isOpen`, `open`, `close`, `show`, `hide`, and `toggle` properties.
 *
 * @param {Ref<boolean>} [valueRef] - Optional parameter. A Vue ref object that holds the initial state of the modal.
 *
 * @returns {UseModal} - An object with the following properties:
 *                        `value`: a Vue ref object that holds the current state of the modal.
 *                        `isOpen`: a computed property that reflects the current state of the modal.
 *                        `open`: open the modal.
 *                        `close`: close the modal.
 *                        `toggle`: a method to toggle the state of the modal.
 *
 * @example
 * const { open, close, isOpen } = useModal()
 * open() // open the modal
 * close() // close the modal
 * console.log(isOpen.value) // check if the modal is open
 */
export function useModal(valueRef?: MaybeRef<boolean>): UseModal {
  const { value, toggle, setTrue, setFalse } = useBoolean(valueRef)

  const isOpen = computed<boolean>(() => value.value)

  return { value, isOpen, open: setTrue, close: setFalse, toggle }
}

