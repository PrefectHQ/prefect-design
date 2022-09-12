# p-wizard

This component makes any multi-step process clearer to the user. Typically these steps are used to break up a large form into small digestible pieces for the user, but there is no requirement that any step contain a form. 


## Example

component setup
```ts
import { WizardStep } from '@prefecthq/prefect-design'
import StepOne from '@/StepOne.vue'
import StepThree from '@/StepThree.vue'
import StepTwo from '@/StepTwo.vue'

const steps: WizardStep[] = [
  { title: 'Basic Information' },
  { title: 'Terms and Conditions' },
  { title: 'Review' },
]
```

component template
```html
<p-wizard :steps="steps">
  <template #basic-information>
    <StepOne />
  </template>
  <template #terms-and-conditions>
    <StepTwo />
  </template>
  <template #review>
    <StepThree />
  </template>
</p-wizard>
```

> Any slot component (StepOne.vue, StepTwo.vue, StepThree.vue) does not have to be configured in any way to be displayed within a wizard. Components that are designed to be within a wizard can use `useWizardStep` composition to access wizard context, define validation, etc.

## Headers 

The user sees each step, in order, at the top of the component inside of `p-wizard-headers`. These header items have different styles for current step, future step, and completed step. Each step provides a slot for overriding the title.

```html
 <p-wizard >
  <template #{step-key}-heading="{title}">
    ...
  </template>
 </p-wizard>
```

## Actions

There should always be actions available to the user regardless of current step. By default, the actions are "cancel", "previous", and "next". All actions can be overridden with the "actions" slot

```html
 <p-wizard >
  <template #actions="{nextButtonText, handleNextButtonClick}">
    ...
  </template>
 </p-wizard>
```

### Cancel

This button is condition and not shown by default. To have the cancel button show up, pass `show-cancel` to `p-wizard`. When the user clicks cancel, this component will emit `@cancel`.

### previous

This button is always visible, but can be disabled if the user is on the first step. As a convenience, this component will emit `@previous` when the user clicks.

### next

This button is visible as long as the user is not on the final step. As a convenience, this component will emit `@next` when the user clicks.

### submit

This button is only visible when the user is on the final step. The text for this button is customizable via the `lastStepText` prop. When the user clicks this button the only thing that happens is emitting of `@submit`. The expectation is that the submit handler on `p-wizard` will redirect, or show a completed state instead of the `p-wizard`.

## Slots

| Name | Args | Description |
|----|----|----|
| {step-key} | `{}` | This slot is where the developer should place the content displayed to the user when a given step is the current step. |
| {step-key}-heading | `{title:string}` | This slot overrides the value shown next to the index in the heading component. |
| actions | `{nextButtonText: string, handleNextButtonClick: () => void}` | This slot overrides ALL of the buttons shown in the footer area of `p-wizard`. |

## Props
| Name | Type | Description |
|----|----|----|
| steps | `WizardStep[]` | This is the foundation of the component. The steps defined here drive both the header values and what slots are available for each step. Each step only needs to define `title:string`, which is what will be shown in the header area. If the developer chooses to provide `key?:string`, that will be the value used to place slots, define step content with `useWizardStep`, get steps from `useWizard`, etc. This object can also contain the `WizardStepValidator`. |
| show-cancel | `boolean?` | This prop conditionally hides the cancel button inside of the footer area of `p-wizard`. Defaults to `false`. |
| last-step-text | `string?` | This prop overrides the text displayed on the submit button, shown when the user is on the last step of the form in place of the next button.  Defaults to `"Submit"`. |

## useWizard

This composition is called by default from within `p-wizard` setup. The component itself offloads the responsibility of knowing current step, how to change steps, how to validate, etc to this composition.

### Args

| Name | Type | Description | 
| ---- | ---- | ---- | 
| steps | `WizardStep[] \| Ref<WizardStep[]>` | These are the same steps provided to `p-wizard`.  |

### Returns

| Name | Type | Description | 
| ---- | ---- | ---- | 
| steps | `Ref<WizardStep[]>` | Ref of the steps passed in. Useful for components used in the slot of wizard for gathering greater context. |
| currentStepIndex | `Ref<number>` | Zero-based index the user is current viewing | 
| currentStep | `ComputedRef<WizardStep>` | Corresponding value of `steps[currentStepIndex]` | 
| loading | `Ref<boolean>` | Used to display loading. By default loading only happens during async validation. |
| next | `() => void` | Convenience method for `goto(currentStepIndex + 1)` |
| previous | `() => void` | Convenience method for `goto(currentStepIndex - 1)`|
| goto | `(key: string) => number \| (step: WizardStep) => number \| (keyOrStep: string \| WizardStep) => number` | This method is responsible for updating `currentStepIndex`. This method is also responsible for finding and running any validation methods needed to pass each step. Note, `goto` will validate EACH step from current step to desired step. |
| getStep | `(key: string) => WizardStep \| undefined (index: number) => WizardStep \| undefined \| (keyOrIndex: string \| number) => WizardStep \| undefined;` | This method returns the desired step or `undefined` if no step is found. |
| setStep | `(key: string, step: WizardStep) => void` | This method is used to update the internal dataset of steps. This is particularly useful when slot components override the validation of a step without losing reactivity. | 
| isValid | `(index?: number) => Promise<boolean>` | This method exposes the internal validation for the developer. `index` is the desired step to validate up to, and defaults to `currentStepIndex + 1`.

## useWizardStep

This composition is designed to enable components used inside of the step slot to have context into the greater wizard it belongs to. 

> If you try calling `useWizardStep` outside of the context of a wizard, the composition will throw `WizardNotFound` error.

### Args

| Name | Type | Description | 
| ---- | ---- | ---- | 
| key | `string \| Ref<string> \| undefined` | If a key is provided, the key must match a key of the parent wizard. |

> If you try calling `useWizardStep` with a key that does not match a step key, the composition will throw `WizardStepNotFound` error.

### Returns

| Name | Type | Description | 
| ---- | ---- | ---- | 
| wizard | `UseWizard` | Returns same instance of useWizard that the parent has with reactivity in place. This can be used to change steps, validate steps, etc. |
| step | `WritableComputed<WizardStep> \| undefined` | This computed wraps `getStep`, which returns `Step` for the key provided to `useWizardStep`. When you set this computed, it will call the underlying `setStep` method on `useWizard`. This value will be undefined if `key` is not provided to `useWizard` | 
| defineValidate | `(validate: WizardStepValidator) => void` | This is a convenience method for setting the required validation that should happen when this step is executed. Calling this method is equivalent to `step.value = {...step.value, validate }`. This value will be undefined if `key` is not provided to `useWizard` |

### p-wizard-step

This component was created to bypass the `key` argument for `useWizardStep`. Because we know the key for each slot from within `p-wizard`, we wrap the slot in `p-wizard-step` and pass the key as a prop. `p-wizard-step` then calls `useWizardStep` with the correct key and `provides` the response for any of it's children to use. So defining a component that is aware of the parent wizard context is as easy as

```html
<p-wizard :steps="[{title: 'First Step'}]">
  <template #first-step>
    <StepOne />
  </template>
</p-wizard>
```

from setup of `StepOne.vue`
```ts
const { wizard, step, defineValidate } = inject(useWizardStepKey)
```

## Validation

Validate method is physically stored on each `WizardStep` within the `useWizard`. The validate method can be set by the step definitions themselves.

```ts
const steps: WizardStep[] = [
  {title: 'My Step', validate: () => ...}
]
```

Or validation can be dynamically defined by whatever component gets rendered in the step slot via `useWizardStep`, or by injecting `useWizardStepKey`. 

```ts
// can be used to define validation for ANY step
const { defineValidate } = useWizardStep('my-step')
// or if we want to set validation for current step, thanks to `p-wizard-step` we can simply use 
const { defineValidate } = inject(useWizardStepKey)

defineValidate(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      true
    }, 2000)
  })
})
```

The Validate method type `WizardStepValidator` is defined as `() => boolean | Promise<boolean>`. Any async validation will be awaited, the user will see a loading state.  By default no validation will happen when proceeding past a step that does not override validate.