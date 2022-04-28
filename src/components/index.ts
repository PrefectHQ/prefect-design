import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTag } from './Tag'
import { default as PTextareaInput } from './TextareaInput'
import { default as PTextInput } from './TextInput'
import { default as PToggle } from './Toggle'

export {
  PButton,
  PCheckbox,
  PIcon,
  PTextInput,
  PNumberInput,
  PTag,
  PTextareaInput,
  PToggle
}

export const installs = [
  PButton.install,
  PCheckbox.install,
  PIcon.install,
  PNumberInput.install,
  PTag.install,
  PTextareaInput.install,
  PTextInput.install,
  PToggle.install,
]