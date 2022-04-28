<template>
  <div class="flex flex-col items-start gap-2 mb-4">
    <p-text-input v-model="exampleText" :append="exampleText" />

    <p-text-input
      v-model="exampleText"
      :state="exampleState"
      placeholder="stateful"
    />

    <p-text-input v-model="exampleUrl" class="!pl-0">
      <template #prepend>
        <span class="pl-2">https://</span>
      </template>
      <template #append>
        <span class="h-5 w-5 text-gray-500 mx-2">
          <ArchiveIcon />
        </span>
      </template>
    </p-text-input>

    <p-number-input v-model="exampleNumber" placeholder="numbers" :min="0" :max="20" />

    <p-number-input v-model="exampleDollars" prepend="$" append="USD" />

    <p-text-input v-model="exampleSearch" type="search" placeholder="search...">
      <template #prepend>
        <span class="h-5 w-5 text-gray-500 ml-2">
          <SearchIcon />
        </span>
      </template>
    </p-text-input>

    <p-textarea v-model="exampleTextarea" />
  </div>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { computed, ref } from 'vue'
  import PNumberInput from '@/components/NumberInput'
  import PTextarea from '@/components/Textarea'
  import PTextInput from '@/components/TextInput'
  import { State } from '@/types/state'

  const exampleText = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleNumber = ref(null)
  const exampleSearch = ref('')
  const exampleTextarea = ref('')

  const exampleState = computed(() => {
    return { valid: true, failed: !exampleText.value.length, passed: !!exampleText.value.length } as State
  })
</script>