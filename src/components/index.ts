import { default as PBreadCrumbs } from './BreadCrumbs'
import { default as PButton } from './Button'
import { default as PCheckbox } from './Checkbox'
import { default as PCode } from './Code'
import { default as PContextNavItem } from './ContextNavItem'
import { default as PContextSidebar } from './ContextSidebar'
import { default as PForm } from './Form'
import { default as PGlobalNavItem } from './GlobalNavItem'
import { default as PGlobalSidebar } from './GlobalSidebar'
import { default as PIcon } from './Icon'
import { default as PIconText } from './IconText'
import { default as PLabel } from './Label'
import { default as PListItem } from './ListItem'
import { default as PListItemInput } from './ListItemInput'
import { default as PMenuCard } from './MenuCard'
import { default as PMenuItem } from './MenuItem'
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
  PContextNavItem,
  PGlobalNavItem,
  PContextSidebar,
  PForm,
  PGlobalSidebar,
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
  PListItemInput,
  PMenuCard,
  PMenuItem
}

export const installs = [
  PBreadCrumbs.install,
  PButton.install,
  PCheckbox.install,
  PCode.install,
  PContextNavItem.install,
  PContextSidebar.install,
  PForm.install,
  PGlobalNavItem.install,
  PGlobalSidebar.install,
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
  PMenuCard.install,
  PMenuItem.install,
]

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PBreadCrumbs: typeof PBreadCrumbs,
    PButton: typeof PButton,
    PCheckbox: typeof PCheckbox,
    PCode: typeof PCode,
    PContextNavItem: typeof PContextNavItem,
    PContextSidebar: typeof PContextSidebar,
    PGlobalNavItem: typeof PGlobalNavItem,
    PGlobalSidebar: typeof PGlobalSidebar,
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
    PTab: typeof PTab,
    PTabs: typeof PTabs,
  }
}