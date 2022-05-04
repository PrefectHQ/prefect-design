import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PForm } from './Form'
import { default as PIcon } from './Icon'
import { default as PIconText } from './IconText'
import { default as PLabel } from './Label'
import { default as PNumberInput } from './NumberInput'
import { default as PTag } from './Tag'
import { default as PTextarea } from './Textarea'
import { default as PTextInput } from './TextInput'
import { default as PToast } from './Toast'
import { default as PToggle } from './Toggle'

export {
  PButton,
  PCheckbox,
  PForm,
  PLabel,
  PIcon,
  PNumberInput,
  PTextarea,
  PTextInput,
  PToast,
  PToggle,
  PTag,
  PIconText
}

export const installs = [
  PButton.install,
  PCheckbox.install,
  PForm.install,
  PLabel.install,
  PIcon.install,
  PNumberInput.install,
  PTextarea.install,
  PTextInput.install,
  PToast.install,
  PToggle.install,
  PTag.install,
  PIconText.install,
]