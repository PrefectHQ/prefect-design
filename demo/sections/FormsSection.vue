<template>
  <Section heading="Forms">
    <p-checkbox v-model="disabled" label="Disable All Fields" />

    <p-form heading="Header Text">
      <p-label label="Plain text" :state="exampleState">
        <p-text-input v-model="exampleText" :disabled="disabled" :append="exampleText" :state="exampleState" />
      </p-label>

      <p-label label="Slots for prepend & append" :state="exampleState">
        <p-text-input v-model="exampleUrl" :disabled="disabled" class="form__url" :state="exampleState">
          <template #prepend>
            <span class="pl-2">https://</span>
          </template>
          <template #append>
            <span class="h-5 w-5 text-gray-500 mx-2">
              <ArchiveIcon />
            </span>
          </template>
        </p-text-input>
      </p-label>

      <p-label label="Numbers only" :state="exampleState">
        <p-number-input v-model="exampleNumber" :disabled="disabled" :min="0" :max="20" :state="exampleState" />
      </p-label>

      <p-label label="Props for prepend & append" message="With some helpful text" :state="exampleState">
        <p-number-input v-model="exampleDollars" :disabled="disabled" prepend="$" append="USD" :state="exampleState" />
      </p-label>

      <p-label label="Search" :state="exampleState">
        <p-text-input v-model="exampleSearch" :disabled="disabled" type="search" placeholder="search..." :state="exampleState">
          <template #prepend>
            <span class="h-5 w-5 text-gray-500 ml-2">
              <SearchIcon />
            </span>
          </template>
        </p-text-input>
      </p-label>

      <p-label label="Text area" :state="exampleState">
        <p-textarea v-model="exampleTextarea" :disabled="disabled" editor="textarea" :state="exampleState" />
      </p-label>

      <p-checkbox v-model="exampleBoolean" :disabled="disabled" :state="exampleState">
        <template #label>
          <span class="order-last">
            <span v-if="typeof exampleBoolean === 'boolean'">{{ exampleBoolean }}</span>
            <em v-else>undefined</em>
          </span>
        </template>
      </p-checkbox>

      <p-label label="Cartoons" :message="JSON.stringify(exampleCheckboxArray)" :state="exampleState">
        <fieldset :disabled="disabled">
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Tom" label="Tom" :state="exampleState" />
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Jerry" label="Jerry" :state="exampleState" />
        </fieldset>
      </p-label>

      <p-label label="Native select" :message="JSON.stringify(exampleNativeSelect)" :state="exampleState">
        <p-native-select v-model="exampleNativeSelect" :options="exampleOptionsWithEmpty" :state="exampleState" />
      </p-label>

      <p-label label="Hybrid select" :message="JSON.stringify(exampleSelect)" :state="exampleState">
        <p-select v-model="exampleSelect" allow-deselect :options="exampleOptionsWithEmpty" :state="exampleState" />
      </p-label>

      <p-label label="Combobox select" :message="JSON.stringify(exampleCombobox)" :state="exampleState">
        <p-combobox v-model="exampleCombobox" allow-deselect :options="exampleOptions" :state="exampleState" />
      </p-label>

      <p-label label="Plain text combobox that allows unknown value and multiple" :message="JSON.stringify(exampleCombobox2)" :state="exampleState">
        <p-combobox v-model="exampleCombobox2" allow-unknown-value :options="['Tim', 'Jeffrey', 'Elon']" :state="exampleState" />
      </p-label>

      <p-label label="Multi select" :message="JSON.stringify(exampleMultiSelect)" :state="exampleState">
        <p-select v-model="exampleMultiSelect" :options="exampleOptions" :state="exampleState" />
      </p-label>

      <p-label label="Native Date Input" :message="JSON.stringify(exampleDate)" :state="exampleState">
        <p-native-date-input v-model="exampleDate" :state="exampleState" />
      </p-label>

      <p-label label="Hybrid Date Input" :message="JSON.stringify(exampleDate)" :state="exampleState">
        <!--
          <p-date-input
          v-model="exampleDate"
          :show-time="showTimeInExampleDate"
          :clearable="isClearableDate"
          :min="minDate"
          :max="maxDate"
          :state="exampleState"
          />
        -->
        <div class="flex justify-start gap-4">
          <p-checkbox v-model="showTimeInExampleDate" label="Show Time" />

          <p-checkbox v-model="isClearableDate" label="Clearable" />
        </div>
        <div class="flex gap-4 w-1/2">
          <p-label label="Min Value" :message="minDate ? format(minDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="minDate" :state="exampleState" />
          </p-label>

          <p-label label="Max Value" :message="maxDate ? format(maxDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="maxDate" :state="exampleState" />
          </p-label>
        </div>
      </p-label>

      <p-label label="Tags Input" :message="JSON.stringify(exampleTagsValue)" :state="exampleState">
        <PTagsInput v-model:tags="exampleTagsValue" :state="exampleState" />
      </p-label>

      <p-label label="Tags Area" :message="JSON.stringify(exampleTagsValue)" :state="exampleState">
        <PTagsArea v-model:tags="exampleTagsValue" :state="exampleState" />
      </p-label>

      <p-label label="Validation State">
        <p-checkbox v-model="exampleState.valid" label="valid" />
        <p-checkbox v-model="exampleState.validated" label="validated" />
        <p-checkbox v-model="exampleState.pending" label="pending" />
      </p-label>
    </p-form>
  </Section>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { format } from 'date-fns'
  import { reactive, ref } from 'vue'
  import Section from '../components/Section.vue'
  import PCheckbox from '@/components/Checkbox/PCheckbox.vue'
  import PCombobox from '@/components/Combobox/PCombobox.vue'
  import PDateInput from '@/components/DateInput/PDateButton.vue'
  import PForm from '@/components/Form/PForm.vue'
  import PLabel from '@/components/Label/PLabel.vue'
  import PNativeDateInput from '@/components/NativeDateInput/PNativeDateInput.vue'
  import PNativeSelect from '@/components/NativeSelect/PNativeSelect.vue'
  import PNumberInput from '@/components/NumberInput/PNumberInput.vue'
  import PSelect from '@/components/Select/PSelect.vue'
  import PTagsArea from '@/components/TagsArea/PTagsArea.vue'
  import PTagsInput from '@/components/TagsInput/PTagsInput.vue'
  import PTextarea from '@/components/Textarea/PTextarea.vue'
  import PTextInput from '@/components/TextInput/PTextInput.vue'
  import { State } from '@/types/state'

  const disabled = ref(false)

  const exampleText = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleNumber = ref(null)
  const exampleSearch = ref('')
  const exampleTextarea = ref('')
  const exampleBoolean = ref<boolean>(false)
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
  const exampleCombobox = ref('Space-X')
  const exampleCombobox2 = ref([])
  const exampleMultiSelect = ref<string[]>([])
  const exampleDate = ref<Date | null>(new Date())
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
</style>