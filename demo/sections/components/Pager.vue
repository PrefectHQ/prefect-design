<template>
  <ComponentPage
    title="Pager"
    :demos="[
      { title: 'Pager' },
      { title: 'Table' },
    ]"
  >
    <template #description>
      This is where we add a short description of <p-code>p-pager</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #pager>
      <template v-for="item in currentPageItems" :key="item">
        <div>{{ item }}</div>
      </template>
      <hr class="my-2">
      <p-pager v-bind="{ page, pages }" @next="next" @previous="previous" />
    </template>

    <template #table>
      <p-table :data="data" class="mb-2" />
      <p-pager v-bind="{ page, pages }" @next="next" @previous="previous" />
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

  function previous(): void {
    page.value -= 1
  }

  function next(): void {
    page.value += 1
  }
</script>