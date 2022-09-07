<template>
  <ComponentPage
    title="Forms"
    :demos="[
      { title: 'p-label Behavior', description: 'Using `for` and `id` attrs' },
      { title: 'p-label Slot', description: 'Using `id` slot scope' },
      { title: 'Prepend and Append Props' },
      { title: 'Prepend and Append Slots' },
      { title: 'Numbers Only' },
      { title: 'Search Input' },
      { title: 'Textarea' },
      { title: 'Checkbox Array' },
      { title: 'Native Select' },
      { title: 'Hybrid Select' },
      { title: 'Typeahead Select' },
      { title: 'Combobox Select' },
      { title: 'Multi Select' },
      { title: 'Combobox that allows custom values' },
      { title: 'Native Date Input' },
      { title: 'Hybrid Date Input' },
      { title: 'Tags Input' },
      { title: 'Tags Area' },
      { title: 'Checkbox' },
      { title: 'Toggle' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-forms</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.

      <p-label is="div" label="Validation State">
        <p-checkbox v-model="exampleState.valid" label="valid" />
        <p-checkbox v-model="exampleState.validated" label="validated" />
        <p-checkbox v-model="exampleState.pending" label="pending" />
        <p-checkbox v-model="disabled" label="disabled" />
      </p-label>
    </template>

    <template #p-label-behavior>
      <p-label label="Label text" for="plain-text" :state="exampleState">
        <p-text-input id="plain-text" v-model="exampleText" :disabled="disabled" :append="exampleText" :state="exampleState" />
      </p-label>
    </template>

    <template #p-label-slot>
      <p-label label="Label text" :state="exampleState">
        <template #default="{ id }">
          <p-text-input :id="id" v-model="exampleText" :disabled="disabled" :append="exampleText" :state="exampleState" />
        </template>
      </p-label>
    </template>

    <template #prepend-and-append-props>
      <p-number-input v-model="exampleDollars" :disabled="disabled" prepend="$" append="USD" :state="exampleState" />
    </template>

    <template #prepend-and-append-slot>
      <p-text-input v-model="exampleUrl" :disabled="disabled" class="form__url" :state="exampleState">
        <template #prepend>
          <span class="pl-2">https://</span>
        </template>
        <template #append>
          <span class="h-5 w-5 text-gray-500 mx-2">
            <p-icon icon="ArchiveIcon" />
          </span>
        </template>
      </p-text-input>
    </template>

    <template #number-only>
      <p-number-input v-model="exampleNumber" :disabled="disabled" :min="0" :max="20" :state="exampleState" />
    </template>

    <template #search-input>
      <p-text-input v-model="exampleSearch" :disabled="disabled" type="search" placeholder="search..." :state="exampleState">
        <template #prepend>
          <span class="h-5 w-5 text-gray-500 ml-2">
            <p-icon icon="SearchIcon" />
          </span>
        </template>
      </p-text-input>
    </template>

    <template #textarea>
      <p-textarea v-model="exampleTextarea" :disabled="disabled" editor="textarea" :state="exampleState" />
    </template>

    <template #checkbox-array>
      <p-label label="" :message="JSON.stringify(exampleCheckboxArray)" :state="exampleState">
        <fieldset :disabled="disabled">
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Tom" label="Tom" :state="exampleState" />
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Jerry" label="Jerry" :state="exampleState" />
        </fieldset>
      </p-label>
    </template>

    <template #native-select>
      <p-label label="" :message="JSON.stringify(exampleNativeSelect)" :state="exampleState">
        <p-native-select v-model="exampleNativeSelect" :disabled="disabled" :options="exampleOptionsWithEmpty" :state="exampleState" />
      </p-label>
    </template>

    <template #hybrid-select>
      <p-label label="" :message="JSON.stringify(exampleSelect)" :state="exampleState" class="h-96">
        <p-select v-model="exampleSelect" :disabled="disabled" allow-deselect :options="exampleOptionsWithEmpty" :state="exampleState" />
      </p-label>
    </template>

    <template #typeahead-select>
      <div class="h-96">
        <p-type-ahead v-model="exampleTypeAhead" :options="exampleOptions.map(({ label }) => label)" />
      </div>
    </template>

    <template #combobox-select>
      <p-label label="" :message="JSON.stringify(exampleCombobox)" :state="exampleState" class="h-96">
        <p-combobox v-model="exampleCombobox" :disabled="disabled" allow-deselect :options="exampleOptions" :state="exampleState" />
      </p-label>
    </template>

    <template #multi-select>
      <p-label label="" :message="JSON.stringify(exampleMultiSelect)" :state="exampleState" class="h-96">
        <p-select v-model="exampleMultiSelect" :disabled="disabled" :options="exampleOptions" :state="exampleState" />
      </p-label>
    </template>

    <template #combobox-that-allows-custom-values>
      <p-label label="" :message="JSON.stringify(exampleCombobox2)" :state="exampleState" class="h-96">
        <p-combobox v-model="exampleCombobox2" :disabled="disabled" allow-unknown-value :options="['Tim', 'Jeffrey', 'Elon']" :state="exampleState" />
      </p-label>
    </template>

    <template #native-date-input>
      <p-label :message="JSON.stringify(exampleDate)" :state="exampleState">
        <p-native-date-input
          v-model="exampleDate"
          :min="minDate"
          :max="maxDate"
          :disabled="disabled"
          :state="exampleState"
        />
      </p-label>
    </template>

    <template #hybrid-date-input>
      <p-label label="" :message="JSON.stringify(exampleDate)" :state="exampleState" class="h-96">
        <p-content>
          <p-date-input
            v-model="exampleDate"
            :show-time="showTimeInExampleDate"
            :clearable="isClearableDate"
            :disabled="disabled"
            :min="minDate"
            :max="maxDate"
            :state="exampleState"
          />
          <div class="flex justify-start gap-4">
            <p-checkbox v-model="showTimeInExampleDate" :disabled="disabled" label="Show Time" />

            <p-checkbox v-model="isClearableDate" :disabled="disabled" label="Clearable" />
          </div>
          <div class="flex gap-4 w-1/2">
            <p-label label="Min Value" :message="minDate ? format(minDate, 'MMM do, yyyy h:mm a') : ''">
              <p-native-date-input v-model="minDate" :disabled="disabled" :state="exampleState" />
            </p-label>

            <p-label label="Max Value" :message="maxDate ? format(maxDate, 'MMM do, yyyy h:mm a') : ''">
              <p-native-date-input v-model="maxDate" :disabled="disabled" :state="exampleState" />
            </p-label>
          </div>
        </p-content>
      </p-label>
    </template>

    <template #tags-input>
      <p-label label="Tags Input" :message="JSON.stringify(exampleTagsValue)" :state="exampleState" class="h-44">
        <PTagsInput v-model="exampleTagsValue" :disabled="disabled" :state="exampleState" />
      </p-label>
    </template>

    <template #tags-area>
      <p-label label="Tags Area" :message="JSON.stringify(exampleTagsValue)" :state="exampleState">
        <PTagsArea v-model="exampleTagsValue" :disabled="disabled" :state="exampleState" />
      </p-label>
    </template>

    <template #checkbox>
      <p-label label="Checkbox">
        <p-checkbox v-model="exampleBoolean" :disabled="disabled" :state="exampleState">
          <template #label>
            <span class="order-last">
              <span v-if="typeof exampleBoolean === 'boolean'">{{ exampleBoolean }}</span>
              <em v-else>null</em>
            </span>
          </template>
        </p-checkbox>
      </p-label>
    </template>

    <template #toggle>
      <p-label label="Toggle">
        <div class="flex flex-col gap-2">
          <p-toggle v-model="exampleBoolean" :disabled="disabled" :state="exampleState" :append="exampleBoolean?.toString() ?? 'null'" />
          <p-toggle
            v-model="exampleAnimalBoolean"
            class="color-toggle"
            :disabled="disabled"
            :state="exampleState"
            prepend="green"
            append="blue"
          />
        </div>
      </p-label>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PCheckbox from '@/components/Checkbox/PCheckbox.vue'
  import PCombobox from '@/components/Combobox/PCombobox.vue'
  import PDateInput from '@/components/DateInput/PDateInput.vue'
  import PLabel from '@/components/Label/PLabel.vue'
  import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import PNumberInput from '@/components/NumberInput/PNumberInput.vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import PTagsArea from '@/components/TagsArea/PTagsArea.vue'
  import PTagsInput from '@/components/TagsInput/PTagsInput.vue'
  import PTextarea from '@/components/Textarea/PTextarea.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import PTypeAhead from '@/components/TypeAhead/PTypeAhead.vue'
  import { State } from '@/types/state'
  import { format } from 'date-fns'
  import { reactive, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const disabled = ref(false)

  const exampleText = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleNumber = ref(null)
  const exampleSearch = ref('')
  const exampleTextarea = ref('')
  const exampleBoolean = ref<boolean | null>(null)
  const exampleAnimalBoolean = ref(false)
  const exampleCheckboxArray = ref<string[]>([])
  const exampleNativeSelect = ref(null)
  const exampleSelect = ref(null)
  const exampleOptions = [
    { label: 'Tim Cook', value: 'Apple' },
    { label: 'Satya Nadella', value: 'Microsoft' },
    { label: 'Jeffrey Bezos', value: 'Amazon', disabled: true },
    { label: 'Sundar Pichai', value: 'Google' },
    { label: 'Elon Musk', value: 'Space-X' },
    { label: 'Mark Lizardking', value: 'Facebook' },
  ]
  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    ...exampleOptions,
  ]
  const exampleTypeAhead = ref('')
  const exampleCombobox = ref('Space-X')
  const exampleCombobox2 = ref([])
  const exampleMultiSelect = ref<string[]>([])
  const exampleDate = ref<Date | null>()
  const minDate = ref<Date | null>(null)
  const maxDate = ref<Date | null>(null)

  const exampleState = reactive<State>({
    valid: true,
    validated: false,
    pending: false,
    dirty: false,
    touched: false,
  })

  const showTimeInExampleDate = ref(true)
  const isClearableDate = ref(false)

  const exampleTagsValue = ref<string[]>([])
</script>

<style>
  .form__url .p-text-input__control {
    padding-left: 0;
  }

  .color-toggle .p-toggle__control:not(.p-toggle__control--checked) { @apply
    bg-green-600
    border-green-600
  }
</style>