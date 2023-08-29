<template>
  <ComponentPage
    title="Base Input"
    :demos="[
      { title: 'Basic' },
      { title: 'Prepend and Append Props' },
      { title: 'Prepend and Append Slots' },
      { title: 'Search Input' },
    ]"
  >
    <template #description>
      <DemoState v-model:state="exampleState" v-model:disabled="disabled" />
    </template>

    <template #basic>
      <p-text-input v-model="basic" placeholder="Placeholder" :disabled="disabled" :state="exampleState" />
    </template>

    <template #prepend-and-append-props>
      <p-number-input v-model="exampleDollars" :disabled="disabled" prepend="$" append="USD" :state="exampleState" />
    </template>

    <template #prepend-and-append-slots>
      <p-text-input v-model="exampleUrl" :disabled="disabled" class="form__url" :state="exampleState">
        <template #prepend>
          <span class="pl-2">https://</span>
        </template>
        <template #append>
          <span class="h-5 w-5 text-gray-500 mx-2">
            <p-icon icon="ArchiveBoxIcon" />
          </span>
        </template>
      </p-text-input>
    </template>

    <template #search-input>
      <p-text-input v-model="exampleSearch" :disabled="disabled" type="search" placeholder="search..." :state="exampleState">
        <template #prepend>
          <span class="h-5 w-5 text-gray-500 ml-2">
            <p-icon icon="MagnifyingGlassIcon" />
          </span>
        </template>
      </p-text-input>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { State } from '@/types'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import DemoState from '@/demo/components/DemoState.vue'

  const exampleState = ref<State>()
  const disabled = ref(false)

  const basic = ref('')
  const exampleUrl = ref('')
  const exampleDollars = ref(0)
  const exampleSearch = ref('')
</script>