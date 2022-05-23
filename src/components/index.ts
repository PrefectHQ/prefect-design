import { default as PBreadCrumbs } from './BreadCrumbs'
import { default as PButton } from './Button'
import { default as PCalendar } from './Calendar'
import { default as PCheckbox } from './Checkbox'
import { default as PCode } from './Code'
import { default as PCombobox } from './Combobox'
import { default as PContextDivider } from './ContextDivider'
import { default as PContextNavItem } from './ContextNavItem'
import { default as PContextSidebar } from './ContextSidebar'
import { default as PDateInput } from './DateInput'
import { default as PDatePicker } from './DatePicker'
import { default as PEmptyState } from './EmptyState'
import { default as PForm } from './Form'
import { default as PGlobalNavItem } from './GlobalNavItem'
import { default as PGlobalSidebar } from './GlobalSidebar'
import { default as PIcon } from './Icon'
import { default as PIconText } from './IconText'
import { default as PKeyValue } from './KeyValue'
import { default as PLabel } from './Label'
import { default as PListItem } from './ListItem'
import { default as PListItemInput } from './ListItemInput'
import { default as PModal } from './Modal'
import { default as PNativeDateInput } from './NativeDateInput'
import { default as PNativeSelect } from './NativeSelect'
import { default as PNumberInput } from './NumberInput'
import { default as POverflowMenu } from './OverflowMenu'
import { default as POverflowMenuItem } from './OverflowMenuItem'
import { default as PSelect } from './Select'
import { default as PSelectOption } from './SelectOption'
import { default as PTab } from './Tab'
import { PTable, PTableBody, PTableData, PTableFoot, PTableHead, PTableHeader, PTableRow } from './Table'
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
  PCalendar,
  PCheckbox,
  PCode,
  PCombobox,
  PContextDivider,
  PContextNavItem,
  PContextSidebar,
  PDateInput,
  PDatePicker,
  PEmptyState,
  PForm,
  PGlobalNavItem,
  PGlobalSidebar,
  PIcon,
  PIconText,
  PKeyValue,
  PLabel,
  PListItem,
  PListItemInput,
  PModal,
  PNativeDateInput,
  PNativeSelect,
  PNumberInput,
  POverflowMenu,
  POverflowMenuItem,
  PSelect,
  PSelectOption,
  PTab,
  PTabs,
  PTag,
  PTagWrapper,
  PTextarea,
  PTextInput,
  PToast,
  PToggle,
  PTable,
  PTableBody,
  PTableData,
  PTableFoot,
  PTableHead,
  PTableHeader,
  PTableRow
}

export const installs = [
  PBreadCrumbs.install,
  PButton.install,
  PCalendar.install,
  PCheckbox.install,
  PCode.install,
  PCombobox.install,
  PContextDivider.install,
  PContextNavItem.install,
  PContextSidebar.install,
  PDateInput.install,
  PDatePicker.install,
  PEmptyState.install,
  PForm.install,
  PGlobalNavItem.install,
  PGlobalSidebar.install,
  PIcon.install,
  PIconText.install,
  PKeyValue.install,
  PLabel.install,
  PListItem.install,
  PListItemInput.install,
  PModal.install,
  PNativeDateInput.install,
  PNativeSelect.install,
  PNumberInput.install,
  POverflowMenu.install,
  POverflowMenuItem.install,
  PSelect.install,
  PSelectOption.install,
  PTab.install,
  PTabs.install,
  PTag.install,
  PTagWrapper.install,
  PTextarea.install,
  PTextInput.install,
  PToast.install,
  PToggle.install,
  PTableBody.install,
  PTableData.install,
  PTableFoot.install,
  PTableHead.install,
  PTableHeader.install,
  PTableRow.install,
]

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PBreadCrumbs: typeof PBreadCrumbs,
    PButton: typeof PButton,
    PCalendar: typeof PCalendar,
    PCheckbox: typeof PCheckbox,
    PCode: typeof PCode,
    PCombobox: typeof PCombobox,
    PContextNavItem: typeof PContextNavItem,
    PContextSidebar: typeof PContextSidebar,
    PDateInput: typeof PDateInput,
    PDatePicker: typeof PDatePicker,
    PEmptyState: typeof PEmptyState,
    PForm: typeof PForm,
    PGlobalNavItem: typeof PGlobalNavItem,
    PGlobalSidebar: typeof PGlobalSidebar,
    PIcon: typeof PIcon,
    PIconText: typeof PIconText,
    PKeyValue: typeof PKeyValue,
    PLabel: typeof PLabel,
    PListItem: typeof PListItem,
    PListItemInput: typeof PListItemInput,
    PModal: typeof PModal,
    PNativeDateInput: typeof PNativeDateInput,
    PNativeSelect: typeof PNativeSelect,
    PNumberInput: typeof PNumberInput,
    POverflowMenu: typeof POverflowMenu,
    POverflowMenuItem: typeof POverflowMenuItem,
    PSelect: typeof PSelect,
    PSelectOption: typeof PSelectOption,
    PTab: typeof PTab,
    PTabs: typeof PTabs,
    PTag: typeof PTag,
    PTagWrapper: typeof PTagWrapper,
    PTextarea: typeof PTextarea,
    PTextInput: typeof PTextInput,
    PToast: typeof PToast,
    PToggle: typeof PToggle,
    PTableBody: typeof PTableBody,
    PTableData: typeof PTableData,
    PTableFoot: typeof PTableFoot,
    PTableHead: typeof PTableHead,
    PTableHeader: typeof PTableHeader,
    PTableRow: typeof PTableRow,
  }
}