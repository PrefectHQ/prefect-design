import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PForm } from './Form'
import { default as PIcon } from './Icon'
import { default as PLabel } from './Label'
import { default as PNumberInput } from './NumberInput'
import { default as PTag } from './Tag'
import { default as PTextarea, default as PTextareaInput } from './Textarea'
import { default as PTextInput } from './TextInput'
import { default as PToggle } from './Toggle'

export {
  PButton,
  PCheckbox,
  PForm,
  PLabel,
  PIcon,
  PNumberInput,
  PTag,
  PTextareaInput,
  PTextarea,
  PTextInput,
  PToggle
}

export const installs = [
  PButton.install,
  PCheckbox.install,
  PForm.install,
  PLabel.install,
  PIcon.install,
  PNumberInput.install,
  PTag.install,
  PTextareaInput.install,
  PTextarea.install,
  PTextInput.install,
  PToggle.install,
]