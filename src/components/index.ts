import { default as PButton } from './Button'
import { default as PIcon } from './Icon'
import { default as PNumberInput } from './NumberInput'
import { default as PTag } from './Tag'
import { default as PTextInput } from './TextInput'
export {
  PButton,
  PIcon,
  PTextInput,
  PNumberInput,
  PTag
}

export const installs = [
  PButton.install,
  PIcon.install,
  PTextInput.install,
  PNumberInput.install,
  PTag.install,
]