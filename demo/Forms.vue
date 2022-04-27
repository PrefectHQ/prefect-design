<template>
  <div class="flex flex-col items-start gap-2 mb-4">
    <p-text-input v-model="exampleText" type="text" :append="exampleText" />
    <p-text-input
      v-model="exampleText"
      type="text"
      :state="{ valid: true, failed: !exampleText.length, passed: exampleText.length }"
      placeholder="stateful"
    />
    <p-text-input v-model="exampleUrl" type="text" class="!pl-0">
      <template #prepend>
        <span class="pl-2">https://</span>
      </template>
      <template #append>
        <span class="h-5 w-5 text-gray-500 mx-2">
          <ArchiveIcon />
        </span>
      </template>
    </p-text-input>
    <p-text-input v-model="exampleDollars" type="text" prepend="$" append="USD" />
    <p-text-input v-model="exampleSearch" type="search" placeholder="search...">
      <template #prepend>
        <span class="h-5 w-5 text-gray-500 ml-2">
          <SearchIcon />
        </span>
      </template>
    </p-text-input>
  </div>
</template>

<script lang="ts" setup>
  import ArchiveIcon from '@heroicons/vue/solid/ArchiveIcon'
  import SearchIcon from '@heroicons/vue/solid/SearchIcon'
  import { ref } from 'vue'

  const exampleText = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleNumber = ref(null)
  const exampleSearch = ref('')
</script>