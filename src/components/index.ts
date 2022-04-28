import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTextarea } from './Textarea'
import { default as PTextInput } from './TextInput'
import { default as PToggle } from './Toggle'

export {
  PButton,
  PCheckbox,
  PIcon,
  PNumberInput,
  PTextarea,
  PTextInput,
  PToggle
}

export const installs = [
  PButton.install,
  PCheckbox.install,
  PIcon.install,
  PNumberInput.install,
  PTextarea.install,
  PTextInput.install,
  PToggle.install,
]