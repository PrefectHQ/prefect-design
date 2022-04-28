import { default as PButton } from './Button'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTextarea } from './Textarea'
import { default as PTextInput } from './TextInput'
import { default as PToggle } from './Toggle'

export {
  PButton,
  PIcon,
  PNumberInput,
  PTextarea,
  PTextInput,
  PToggle
}

export const installs = [
  PButton.install,
  PIcon.install,
  PNumberInput.install,
  PTextarea.install,
  PTextInput.install,
  PToggle.install,
]