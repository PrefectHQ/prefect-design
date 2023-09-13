<template>
  <ComponentPage
    title="Pager"
    :demos="[
      { title: 'Simple' },
      { title: 'Pages' },
      { title: 'Table' },
    ]"
  >
    <template #simple>
      <template v-for="item in currentPageItems" :key="item">
        <div>{{ item }}</div>
      </template>
      <hr class="my-2">
      <p-pager v-model:page="page" />
    </template>

    <template #pages>
      <template v-for="item in currentPageItems" :key="item">
        <div>{{ item }}</div>
      </template>
      <hr class="my-2">
      <p-pager v-model:page="page" :pages="pages" />
    </template>

    <template #table>
      <p-table :data="data" class="mb-2" />
      <p-pager v-model:page="page" :pages="pages" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const page = ref(1)
  const pages = ref(10)
  const itemsPerPage = ref(5)
  const items = computed(() => new Array(pages.value * itemsPerPage.value).fill(null).map((item, index) => `Item ${index + 1}`))
  const currentPageStart = computed(() => (page.value - 1) * itemsPerPage.value)
  const currentPageEnd = computed(() => currentPageStart.value + itemsPerPage.value)
  const currentPageItems = computed(() => items.value.slice(currentPageStart.value, currentPageEnd.value))
  const data = computed(() => currentPageItems.value.map(item => ({ item })))
</script>