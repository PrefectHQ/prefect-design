<template>
  <div class="flex flex-col items-start gap-2 mb-4">
    <div class="flex items-center gap-2">
      <p-checkbox-input v-model="disabled" /> Disable All Fields
    </div>

    <p-text-input v-model="exampleText" :disabled="disabled" :append="exampleText" />

    <p-text-input
      v-model="exampleText"
      :disabled="disabled"
      :state="exampleState"
      placeholder="stateful"
    />

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

    <p-number-input v-model="exampleNumber" :disabled="disabled" placeholder="numbers" :min="0" :max="20" />

    <p-number-input v-model="exampleDollars" :disabled="disabled" prepend="$" append="USD" />

    <p-text-input v-model="exampleSearch" :disabled="disabled" type="search" placeholder="search...">
      <template #prepend>
        <span class="h-5 w-5 text-gray-500 ml-2">
          <SearchIcon />
        </span>
      </template>
    </p-text-input>

    <p-textarea-input v-model="exampleTextarea" :disabled="disabled" />

    <div class="flex items-center gap-2">
      <p-checkbox-input v-model="exampleBoolean" :disabled="disabled" />
      <span @click="exampleBoolean = !exampleBoolean">
        <span v-if="typeof exampleBoolean === 'boolean'">{{ exampleBoolean }}</span>
        <em v-else>undefined</em>
      </span>
    </div>

    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2">
        <p-checkbox-input v-model="exampleCheckboxArray" value="Tom" :disabled="disabled" />
        Tom
      </div>

      <div class="flex items-center gap-2">
        <p-checkbox-input v-model="exampleCheckboxArray" value="Jerry" :disabled="disabled" />
        Jerry
      </div>

      <div>{{ exampleCheckboxArray }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { computed, ref } from 'vue'
  import PCheckboxInput from '@/components/CheckboxInput'
  import PNumberInput from '@/components/NumberInput'
  import PTextareaInput from '@/components/TextareaInput'
  import PTextInput from '@/components/TextInput'
  import { State } from '@/types/state'

  const disabled = ref(false)

  const exampleText = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleNumber = ref(null)
  const exampleSearch = ref('')
  const exampleTextarea = ref('')
  const exampleBoolean = ref<boolean>()
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