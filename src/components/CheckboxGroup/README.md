# p-checkbox-group

This component allows the user to group checkboxes with a single component, rather than using multiple p-checkbox components.

## Example

```ts
const value = ref([])
const options = ['first', 'second', 'third']
const disabled = ref(false)
```

```html
<p-checkbox-group v-model="value" :options="options" :disabled="disabled" />
```

## Slots

| Name | Args | Description |
|----|----|----|
| label | `{}` | This optional slot is for adding customization to the checkbox labels. |


## Props
| Name | Type | Description |
|----|----|----|
| modelValue | `string[] \| number[] \| boolean[]` | This prop represents the array of options that are checked. |
| options | `string[] \| number[] \| boolean[] \| SelectOption[]` | The prop represents the list of options to be displayed as individual checkboxes. |
| disabled | `boolean?` | If this prop is `true`, the entire checkbox group will be disabled. Individual option can be disabled with the `SelectOption.disabled` property. |