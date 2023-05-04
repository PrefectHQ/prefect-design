<template>
  <p-button rounded class="app-navigation-bar-leading__logo-button" icon="PrefectLight" flat @click="handleClick" />
  <span v-if="showHeading" class="app-navigation-bar-leading__heading">Prefect Design</span>

  <p-type-ahead
    v-model="searchTerm"
    class="app-navigation-bar-leading__search-box"
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

  defineProps<{
    showHeading?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'logoClick'): void,
  }>()

  const handleClick = (): void => {
    emit('logoClick')
  }

  const router = useRouter()
  const searchTerm = ref('')

  function selectedSearchTerm(value: string | null): void {
    searchTerm.value = ''

    if (value && routeRecordsFlat[value]) {
      router.push(routeRecordsFlat[value])
    }
  }
</script>

<style>
.app-navigation-bar-leading__logo-button { @apply
  p-2
}

.app-navigation-bar-leading__logo-button .p-icon { @apply
  h-8
  w-8
}

.app-navigation-bar-leading__heading { @apply
  font-normal
  text-xl
}

.app-navigation-bar-leading__search-box { @apply
  text-foreground-600
}
</style>