<template>
  <p-type-ahead
    v-model="searchTerm"
    class="app-search"
    placeholder="Search"
    :options="Object.keys(routeRecordsFlat)"
    @selected="selectedSearchTerm"
  >
    <template #append>
      <p-icon icon="MagnifyingGlassIcon" class="mr-2" />
    </template>
  </p-type-ahead>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { routeRecordsFlat } from '@/demo/router/routeRecordsFlat'

  const router = useRouter()
  const searchTerm = ref('')

  function selectedSearchTerm(value: string | null): void {
    searchTerm.value = ''

    if (value && routeRecordsFlat[value]) {
      router.push(routeRecordsFlat[value])
    }
  }
</script>