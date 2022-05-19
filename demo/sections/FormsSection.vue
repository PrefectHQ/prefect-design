<template>
  <Section heading="Forms">
    <p-checkbox v-model="disabled" label="Disable All Fields" />

    <p-form heading="Header Text">
      <p-label label="Plain text">
        <p-text-input v-model="exampleText" :disabled="disabled" :append="exampleText" />
      </p-label>

      <p-label label="Stateful text">
        <p-text-input v-model="exampleText" :disabled="disabled" :state="exampleState" placeholder="failed" />
      </p-label>

      <p-label label="Slots for prepend & append">
        <p-text-input v-model="exampleUrl" :disabled="disabled" class="form__url">
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

      <p-label label="Numbers only">
        <p-number-input v-model="exampleNumber" :disabled="disabled" :min="0" :max="20" />
      </p-label>

      <p-label label="Props for prepend & append" message="With some helpful text">
        <p-number-input v-model="exampleDollars" :disabled="disabled" prepend="$" append="USD" />
      </p-label>

      <p-label label="Search">
        <p-text-input v-model="exampleSearch" :disabled="disabled" type="search" placeholder="search...">
          <template #prepend>
            <span class="h-5 w-5 text-gray-500 ml-2">
              <SearchIcon />
            </span>
          </template>
        </p-text-input>
      </p-label>

      <p-label label="Text area">
        <p-textarea v-model="exampleTextarea" :disabled="disabled" editor="textarea" />
      </p-label>

      <p-checkbox v-model="exampleBoolean" :disabled="disabled">
        <template #label>
          <span class="order-last">
            <span v-if="typeof exampleBoolean === 'boolean'">{{ exampleBoolean }}</span>
            <em v-else>undefined</em>
          </span>
        </template>
      </p-checkbox>

      <p-label label="Cartoons" :message="JSON.stringify(exampleCheckboxArray)">
        <fieldset :disabled="disabled">
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Tom" label="Tom" />
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Jerry" label="Jerry" />
        </fieldset>
      </p-label>

      <p-label label="Native select" :message="JSON.stringify(exampleNativeSelect)">
        <p-native-select v-model="exampleNativeSelect" :options="exampleOptionsWithEmpty" />
      </p-label>

      <p-label label="Hybrid select" :message="JSON.stringify(exampleSelect)">
        <p-select v-model="exampleSelect" allow-deselect :options="exampleOptionsWithEmpty" />
      </p-label>

      <p-label label="Combobox select" :message="JSON.stringify(exampleCombobox)">
        <p-combobox v-model="exampleCombobox" allow-deselect :options="exampleOptions" />
      </p-label>

      <p-label label="Plain text combobox that allows unknown value" :message="JSON.stringify(exampleCombobox2)">
        <p-combobox v-model="exampleCombobox2" allow-unknown-value :options="['cool', 'story', 'bro']" />
      </p-label>

      <p-label label="Multi select" :message="JSON.stringify(exampleMultiSelect)">
        <p-select v-model="exampleMultiSelect" :options="exampleOptions" multiple />
      </p-label>

      <p-label label="Native Date Input" :message="JSON.stringify(exampleDate)">
        <p-native-date-input v-model="exampleDate" />
      </p-label>

      <p-label label="Hybrid Date Input" :message="JSON.stringify(exampleDate)">
        <p-date-input v-model="exampleDate" :show-time="showTimeInExampleDate" :clearable="isClearableDate" :min="minDate" :max="maxDate" />
        <div class="flex justify-start gap-4">
          <p-checkbox v-model="showTimeInExampleDate" label="Show Time" />

          <p-checkbox v-model="isClearableDate" label="Clearable" />
        </div>
        <div class="flex gap-4 w-1/2">
          <p-label label="Min Value" :message="minDate ? format(minDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="minDate" />
          </p-label>

          <p-label label="Max Value" :message="maxDate ? format(maxDate, 'MMM do, yyyy h:mm a') : ''">
            <p-native-date-input v-model="maxDate" />
          </p-label>
        </div>
      </p-label>
    </p-form>
  </Section>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { format } from 'date-fns'
  import { computed, ref } from 'vue'
  import Section from '../components/Section.vue'
  import PCheckbox from '@/components/Checkbox'
  import PCombobox from '@/components/Combobox'
  import PDateInput from '@/components/DateInput'
  import PForm from '@/components/Form'
  import PLabel from '@/components/Label'
  import PNativeDateInput from '@/components/NativeDateInput'
  import PNativeSelect from '@/components/NativeSelect'
  import PNumberInput from '@/components/NumberInput'
  import PSelect from '@/components/Select'
  import PTextarea from '@/components/Textarea'
  import PTextInput from '@/components/TextInput'
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
    { label: 'Jeffrey Bezos', value: 'Amazon' },
    { label: 'Sundar Pichai', value: 'Google' },
    { label: 'Elon Musk', value: 'Space-X' },
    { label: 'Mark Lizardking', value: 'Facebook' },
  ]
  const exampleOptionsWithEmpty = [
    { label: '', value: null },
    ...exampleOptions,
  ]
  const exampleCombobox = ref('Space-X')
  const exampleCombobox2 = ref('')
  const exampleMultiSelect = ref<string[]>([])
  const exampleDate = ref<Date | null>(new Date())
  const minDate = ref<Date | null>(null)
  const maxDate = ref<Date | null>(null)

  const exampleState = computed(() => {
    return { valid: true, failed: !exampleText.value.length, passed: !!exampleText.value.length } as State
  })

  const showTimeInExampleDate = ref(true)
  const isClearableDate = ref(false)
</script>

<style>
  .form__url .p-text-input__control {
    padding-left: 0;
  }
</style>