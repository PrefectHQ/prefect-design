# p-date-range-input

This component allows the user to select a start date and an end date on a single calendar input. The calendar will provide a visual indication of all the dates which fall within the selected range. It functions very similarly to PDateInput, but with two dates instead of one.

## Example

component setup
```ts
import { ref } from 'vue'

const value = ref({
  start: null,
  end: null,
})
```

```html
<p-date-range-input v-model:startDate="value.start" v-model:endDate="value.end" clearable />
```

## Slots

| Name | Args | Description |
|----|----|----|
| date | `{ date:Date, is-selected:boolean, is-in-selected-range:boolean }` | This slot overrides the display value of a given date on the calendar. |

## Props

| Name | Type | Description |
|----|----|----|
| startDate | `Date \| null \| undefined` | Date value for start of range. |
| endDate | `Date \| null \| undefined` | Date value for end of range. |
| clearable | `boolean \| undefined` | Determines if either date is allowed to be set to `null`. This prop is passed through to underlying `p-date-input` and controls if the "clear" button is presented to user. Additionally, the functionality of clicking either start or end date to clear that value is only possible when this prop is set to true. |