import { default as PBreadCrumbs } from './BreadCrumbs'
import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PCode } from './Code'
import { default as PForm } from './Form'
import { default as PIcon } from './Icon'
import { default as PIconText } from './IconText'
import { default as PLabel } from './Label'
import { default as PListItem } from './ListItem'
import { default as PListItemInput } from './ListItemInput'
import { default as PModal } from './Modal'
import { default as PNumberInput } from './NumberInput'
import { default as PTab } from './Tab'
import { default as PTabs } from './Tabs'
import { default as PTag } from './Tag'
import { default as PTagWrapper } from './TagWrapper'
import { default as PTextarea } from './Textarea'
import { default as PTextInput } from './TextInput'
import { default as PToast } from './Toast'
import { default as PToggle } from './Toggle'

export {
  PBreadCrumbs,
  PButton,
  PCheckbox,
  PCode,
  PForm,
  PLabel,
  PModal,
  PIcon,
  PNumberInput,
  PTextarea,
  PTextInput,
  PToast,
  PToggle,
  PTag,
  PTab,
  PTabs,
  PIconText,
  PTagWrapper,
  PListItem,
  PListItemInput
}

export const installs = [
  PBreadCrumbs.install,
  PButton.install,
  PCheckbox.install,
  PCode.install,
  PForm.install,
  PLabel.install,
  PModal.install,
  PIcon.install,
  PNumberInput.install,
  PTextarea.install,
  PTextInput.install,
  PToast.install,
  PToggle.install,
  PTag.install,
  PIconText.install,
  PTagWrapper.install,
  PTab.install,
  PTabs.install,
  PListItem.install,
  PListItemInput.install,
]

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PBreadCrumbs: typeof PBreadCrumbs,
    PButton: typeof PButton,
    PCheckbox: typeof PCheckbox,
    PCode: typeof PCode,
    PForm: typeof PForm,
    PIcon: typeof PIcon,
    PIconText: typeof PIconText,
    PLabel: typeof PLabel,
    PListItem: typeof PListItem,
    PListItemInput: typeof PListItemInput,
    PModal: typeof PModal,
    PNumberInput: typeof PNumberInput,
    PTag: typeof PTag,
    PTagWrapper: typeof PTagWrapper,
    PTextarea: typeof PTextarea,
    PTextInput: typeof PTextInput,
    PToast: typeof PToast,
    PToggle: typeof PToggle,
  }
}