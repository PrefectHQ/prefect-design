<template>
  <div class="flex flex-col items-start gap-2 mb-4">
    <p-checkbox v-model="disabled" label="Disable All Fields" />

    <p-form header="Header Text">
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

      <p-label label="Props for prepend & append" lower-label="With some helpful text">
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

      <p-label label="Cartoons" :lower-label="JSON.stringify(exampleCheckboxArray)">
        <fieldset :disabled="disabled">
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Tom" label="Tom" />
          <p-checkbox v-model="exampleCheckboxArray" editor="checkbox" value="Jerry" label="Jerry" />
        </fieldset>
      </p-label>
    </p-form>
  </div>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { computed, ref } from 'vue'
  import PCheckbox from '@/components/Checkbox'
  import PForm from '@/components/Form'
  import PLabel from '@/components/Label'
  import PNumberInput from '@/components/NumberInput'
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

  const exampleState = computed(() => {
    return { valid: true, failed: !exampleText.value.length, passed: !!exampleText.value.length } as State
  })
</script>

<style>
  .form__url .p-text-input__control {
    padding-left: 0;
  }
</style>