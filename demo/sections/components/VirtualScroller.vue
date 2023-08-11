<template>
  <ComponentPage title="Virtual Scroller" :demos="[{ title: 'Virtual Scroller' }]">
    <template #virtual-scroller>
      <p-number-input v-model="itemCount" />

      <div class="virtual-scroller_demo">
        <p-virtual-scroller :items="items">
          <template #default="{ item }">
            <div>
              {{ item }}
            </div>
          </template>
        </p-virtual-scroller>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const itemCount = ref(100)
  const items = computed(() => new Array(itemCount.value).fill(null).map((item, index) => ({
    id: index,
    label: `item #${index}`,
  })))
</script>

<style>
.virtual-scroller_demo { @apply
  border
  overflow-auto
  max-h-52
  mt-2
}
</style>