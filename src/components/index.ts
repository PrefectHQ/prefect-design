import { PAutoHeightTransition, install as installPAutoHeightTransition } from './AutoHeightTransition'
import { PBaseInput, install as installPBaseInput } from './BaseInput'
import { PBreadCrumbs, install as installPBreadCrumbs } from './BreadCrumbs'
import { PButton, install as installPButton } from './Button'
import { PButtonGroup, install as installPButtonGroup } from './ButtonGroup'
import { PCalendar, install as installPCalendar } from './Calendar'
import { PCard, install as installPCard } from './Card'
import { PCheckbox, install as installPCheckbox } from './Checkbox'
import { PCode, install as installPCode } from './Code'
import { PCombobox, install as installPCombobox } from './Combobox'
import { PContent, install as installPContent } from './Content'
import { PContextAccordionItem, install as installPContextAccordionItem } from './ContextAccordionItem'
import { PContextDivider, install as installPContextDivider } from './ContextDivider'
import { PContextNavItem, install as installPContextNavItem } from './ContextNavItem'
import { PContextSidebar, install as installPContextSidebar } from './ContextSidebar'
import { PDateInput, install as installPDateInput } from './DateInput'
import { PDatePicker, install as installPDatePicker } from './DatePicker'
import { PDivider, install as installPDivider } from './Divider'
import { PEmptyResults, install as installPEmptyResults } from './EmptyResults'
import { PEmptyState, install as installPEmptyState } from './EmptyState'
import { PForm, install as installPForm } from './Form'
import { PGlobalNavItem, install as installPGlobalNavItem } from './GlobalNavItem'
import { PGlobalSidebar, install as installPGlobalSidebar } from './GlobalSidebar'
import { PIcon, install as installPIcon } from './Icon'
import { PIconButtonMenu, install as installPIconButtonMenu } from './IconButtonMenu'
import { PIconText, install as installPIconText } from './IconText'
import { PKeyValue, install as installPKeyValue } from './KeyValue'
import { PLabel, install as installPLabel } from './Label'
import { PLink, install as installPLink } from './Link'
import { PListItem, install as installPListItem } from './ListItem'
import { PListItemInput, install as installPListItemInput } from './ListItemInput'
import { PLoadingIcon, install as installPLoadingIcon } from './LoadingIcon'
import { PModal, install as installPModal } from './Modal'
import { PNativeDateInput, install as installPNativeDateInput } from './NativeDateInput'
import { PNativeSelect, install as installPNativeSelect } from './NativeSelect'
import { PNumberInput, install as installPNumberInput } from './NumberInput'
import { POverflowMenu, install as installPOverflowMenu } from './OverflowMenu'
import { POverflowMenuItem, install as installPOverflowMenuItem } from './OverflowMenuItem'
import { PPopOver, install as installPPopOver } from './PopOver'
import { PSelect, install as installPSelect } from './Select'
import { PSelectOption, install as installPSelectOption } from './SelectOption'
import { PStepper, install as installPStepper } from './Stepper'
import { PTab, install as installPTab } from './Tab'
import { PTable, PTableBody, PTableData, PTableFoot, PTableHead, PTableHeader, PTableRow, install as installPTable } from './Table'
import { PTabs, install as installPTabs } from './Tabs'
import { PTag, install as installPTag } from './Tag'
import { PTags, install as installPTags } from './Tags'
import { PTagsArea, install as installPTagsArea } from './TagsArea'
import { PTagsInput, install as installPTagsInput } from './TagsInput'
import { PTagWrapper, install as installPTagWrapper } from './TagWrapper'
import { PTextarea, install as installPTextarea } from './Textarea'
import { PTextInput, install as installPTextInput } from './TextInput'
import { PToast, install as installPToast } from './Toast'
import { PToggle, install as installPToggle } from './Toggle'
import { PTypeAhead, install as installPTypeAhead } from './TypeAhead'

export {
  PAutoHeightTransition,
  PBaseInput,
  PBreadCrumbs,
  PButton,
  PButtonGroup,
  PCalendar,
  PCard,
  PCheckbox,
  PCode,
  PCombobox,
  PContent,
  PContextAccordionItem,
  PContextDivider,
  PContextNavItem,
  PContextSidebar,
  PDateInput,
  PDatePicker,
  PDivider,
  PEmptyResults,
  PEmptyState,
  PForm,
  PGlobalNavItem,
  PGlobalSidebar,
  PIcon,
  PIconButtonMenu,
  PIconText,
  PKeyValue,
  PLabel,
  PLink,
  PListItem,
  PListItemInput,
  PLoadingIcon,
  PModal,
  PNativeDateInput,
  PNativeSelect,
  PNumberInput,
  POverflowMenu,
  POverflowMenuItem,
  PPopOver,
  PSelect,
  PSelectOption,
  PStepper,
  PTab,
  PTable,
  PTableBody,
  PTableData,
  PTableFoot,
  PTableHead,
  PTableHeader,
  PTableRow,
  PTabs,
  PTag,
  PTags,
  PTagsArea,
  PTagsInput,
  PTagWrapper,
  PTextarea,
  PTextInput,
  PToast,
  PToggle,
  PTypeAhead
}

export const installs = [
  installPAutoHeightTransition,
  installPBaseInput,
  installPBreadCrumbs,
  installPButton,
  installPButtonGroup,
  installPCalendar,
  installPCard,
  installPCheckbox,
  installPCode,
  installPCombobox,
  installPContent,
  installPContextAccordionItem,
  installPContextDivider,
  installPContextNavItem,
  installPContextSidebar,
  installPDateInput,
  installPDatePicker,
  installPDivider,
  installPEmptyResults,
  installPEmptyState,
  installPForm,
  installPGlobalNavItem,
  installPGlobalSidebar,
  installPIcon,
  installPIconButtonMenu,
  installPIconText,
  installPKeyValue,
  installPLabel,
  installPLink,
  installPListItem,
  installPListItemInput,
  installPLoadingIcon,
  installPModal,
  installPNativeDateInput,
  installPNativeSelect,
  installPNumberInput,
  installPOverflowMenu,
  installPOverflowMenuItem,
  installPPopOver,
  installPSelect,
  installPSelectOption,
  installPStepper,
  installPTab,
  installPTable,
  installPTabs,
  installPTag,
  installPTags,
  installPTagsArea,
  installPTagsInput,
  installPTagWrapper,
  installPTextarea,
  installPTextInput,
  installPToast,
  installPToggle,
  installPTypeAhead,
]

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PAutoHeightTransition: typeof PAutoHeightTransition,
    PBaseInput: typeof PBaseInput,
    PBreadCrumbs: typeof PBreadCrumbs,
    PButton: typeof PButton,
    PButtonGroup: typeof PButtonGroup,
    PCalendar: typeof PCalendar,
    PCard: typeof PCard,
    PCheckbox: typeof PCheckbox,
    PCode: typeof PCode,
    PCombobox: typeof PCombobox,
    PContent: typeof PContent,
    PContextAccordionItem: typeof PContextAccordionItem,
    PContextNavItem: typeof PContextNavItem,
    PContextSidebar: typeof PContextSidebar,
    PDateInput: typeof PDateInput,
    PDatePicker: typeof PDatePicker,
    PDivider: typeof PDivider,
    PEmptyResults: typeof PEmptyResults,
    PEmptyState: typeof PEmptyState,
    PForm: typeof PForm,
    PGlobalNavItem: typeof PGlobalNavItem,
    PGlobalSidebar: typeof PGlobalSidebar,
    PIcon: typeof PIcon,
    PIconButtonMenu: typeof PIconButtonMenu,
    PIconText: typeof PIconText,
    PKeyValue: typeof PKeyValue,
    PLabel: typeof PLabel,
    PLink: typeof PLink,
    PListItem: typeof PListItem,
    PListItemInput: typeof PListItemInput,
    PLoadingIcon: typeof PLoadingIcon,
    PModal: typeof PModal,
    PNativeDateInput: typeof PNativeDateInput,
    PNativeSelect: typeof PNativeSelect,
    PNumberInput: typeof PNumberInput,
    POverflowMenu: typeof POverflowMenu,
    POverflowMenuItem: typeof POverflowMenuItem,
    PPopOver: typeof PPopOver,
    PSelect: typeof PSelect,
    PSelectOption: typeof PSelectOption,
    PStepper: typeof PStepper,
    PTab: typeof PTab,
    PTable: typeof PTable,
    PTableBody: typeof PTableBody,
    PTableData: typeof PTableData,
    PTableFoot: typeof PTableFoot,
    PTableHead: typeof PTableHead,
    PTableHeader: typeof PTableHeader,
    PTableRow: typeof PTableRow,
    PTabs: typeof PTabs,
    PTag: typeof PTag,
    PTags: typeof PTags,
    PTagsArea: typeof PTagsArea,
    PTagsInput: typeof PTagsInput,
    PTagWrapper: typeof PTagWrapper,
    PTextarea: typeof PTextarea,
    PTextInput: typeof PTextInput,
    PToast: typeof PToast,
    PToggle: typeof PToggle,
    PTypeAhead: typeof PTypeAhead,
  }
}