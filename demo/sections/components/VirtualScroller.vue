<template>
  <ComponentPage title="Virtual Scroller" :demos="[{ title: 'Virtual Scroller' }]">
    <template #virtual-scroller>
      <p-content>
        <p-number-input v-model="itemCount" />

        <div class="virtual-scroller_demo">
          <p-virtual-scroller :items name="demo-scroller" :item-estimate-height="24">
            <template #default="{ item, id }">
              <div :id>
                {{ item }}
              </div>
            </template>
          </p-virtual-scroller>
        </div>

        <div class="flex gap-2">
          <p-number-input v-model="itemToScrollTo" />
          <p-button @click="scrollToItem">
            Scroll to item
          </p-button>
          <p-checkbox v-model="smooth" label="smooth" />
        </div>
      </p-content>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { getVirtualScroller } from '@/components/VirtualScroller'
  import { computed, ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const itemCount = ref(1000)
  const items = computed(() => new Array(itemCount.value).fill(null).map((item, index) => ({
    id: index,
    label: `item #${index}`,
  })))

  const itemToScrollTo = ref<number>(800)
  const smooth = ref(true)

  function scrollToItem(): void {
    const scroller = getVirtualScroller('demo-scroller')

    scroller.scrollItemIntoView(itemToScrollTo.value, { behavior: smooth.value ? 'smooth' : 'auto' })
  }
</script>

<style>
.virtual-scroller_demo { @apply
  border
  overflow-auto
  max-h-52
}
</style>