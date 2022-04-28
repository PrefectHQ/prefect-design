import { default as PButton } from './Button'
import { default as PCheckboxInput } from './CheckboxInput'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTextareaInput } from './TextareaInput'
import { default as PTextInput } from './TextInput'

export {
  PButton,
  PCheckboxInput,
  PIcon,
  PNumberInput,
  PTextareaInput,
  PTextInput
}

export const installs = [
  PButton.install,
  PCheckboxInput.install,
  PIcon.install,
  PNumberInput.install,
  PTextareaInput.install,
  PTextInput.install,
]