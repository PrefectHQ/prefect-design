combobox features (r-combobox parity with p-combobox):
- [x] click to open a dropdown list of options
- [] type to search/filter through list of options
- [x] select an option
- [x] options can have separate display and data values
- [x] can select multiple options
- [x] multiple selected options render (as tags?)
- [x] can group the options under header keys
- [x] can override the default filter function (manual prop)
- [x] can type in custom values that are not options
- [] can handle paginated/virtualized options
- [] can customize the empty state - when no options are available
- [] slot parity
  - #default - the selected value
  - #option - each option scoped slot
  - #combobox-options-empty
  - fallthrough rest of slots go straight into PSelect

bugs:
- [] Remove bottom-of-options-(before scrolling)-opacity

new:
- [x] options popover scrolls with keyboard navigation
- [x] button to clear all tags
- [ ] generic object type support
- [ ] ability to provide a filter function