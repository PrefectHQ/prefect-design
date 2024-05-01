# combobox features (r-combobox parity with p-combobox)

- [x] click to open a dropdown list of options
- [x] type to search/filter through list of options
- [x] select an option
- [x] options can have separate display and data values
- [x] can select multiple options
- [x] multiple selected options render (as tags?)
- [x] can group the options under header keys
- [x] can override the default filter function (manual prop)
- [x] can type in custom values that are not options
- [] can handle paginated/virtualized options
  - emit `bottom` event
- [] compatibility with p-input
  - handle fallthrough of `:state`
- [x] can customize the empty state - when no options are available
- [x] slot parity
  - [x] #default - the selected value
  - [x] #option - each option scoped slot
  - [x] #combobox-options-empty
  - [x] fallthrough rest of slots go straight into PSelect

bugs:

- [] Remove bottom-of-options-(before scrolling)-opacity
- [] sometimes slow to open the popover now? especially when in single-select mode.

new:

- [x] options popover scrolls with keyboard navigation
- [x] button to clear all tags
- [ ] generic object type support
- [ ] ability to provide a filter function

todo-remove:

- [] emptyMessage prop. extraneous overlap with empty state slot
- [] manual prop. extraneous overlap with filter function prop. [impl detail] - by default, radix-vue filters string typed options. either remove or better document
- slot apis
  - [] default slot. Doesn't translate well to overriding the input element's displayed value. Easy to do to project content into tags for multi-select, but hard to do for single. PComboboxOld uses this slot for single-selection but not multi-select. RCombobox currently does the opposite
    - RCombobox has bad compatibility with the slot props here as well.
  - [] option slot. RCombobox missing some slot props that pselect propogates through. `selected`, `highlighted`, `index`. Some of these are data attributes on radix-vue. TBH might not need to preserve these.
