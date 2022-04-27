import { default as PButton } from './Button'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTextInput } from './TextInput'

export {
  PButton,
  PIcon,
  PTextInput,
  PNumberInput
}

export const installs = [
  PButton.install,
  PIcon.install,
  PTextInput.install,
  PNumberInput.install,
]