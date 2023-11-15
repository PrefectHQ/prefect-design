<template>
  <ComponentPage title="Table Layout" :demos="[{ title: 'Table Layout' }, { title: 'Sticky Header' }]">
    <template #table-layout>
      <div class="layout-table-section__box layout-table--scrollable">
        <p-checkbox v-model="useFullSlots" label="Use full slots" />

        <p-layout-table class="p-background">
          <template v-if="useFullSlots" #header>
            <div class="bg-fuchsia-500 layout-table-section__box">
              header
            </div>
          </template>

          <template #header-start>
            header-start
          </template>

          <template #header-end>
            header-end
          </template>

          <template #header-sort>
            header-sort
          </template>


          <div class="bg-blue-200 dark:bg-blue-800 layout-table-section__box layout-table__main">
            main
          </div>

          <template v-if="useFullSlots" #footer>
            <div class="bg-orange-500 layout-table-section__box">
              footer
            </div>
          </template>

          <template #footer-start>
            <div class="bg-lime-500 layout-table-section__box">
              footer-start
            </div>
          </template>

          <template #footer-end>
            <div class="bg-amber-500 layout-table-section__box">
              footer-end
            </div>
          </template>
        </p-layout-table>
      </div>
    </template>

    <template #sticky-header>
      <div ref="stickyExampleScrollContainer" class="layout-table-section__box layout-table--scrollable">
        <p-checkbox v-model="useFullSlots" label="Use full slots" />

        <p-layout-table :bounding-element="stickyExampleScrollContainer" class="p-background" sticky>
          <template v-if="useFullSlots" #header>
            <div class="bg-fuchsia-500 layout-table-section__box">
              header
            </div>
          </template>

          <template #header-start>
            header-start
          </template>

          <template #header-end>
            header-end
          </template>

          <template #header-sort>
            header-sort
          </template>


          <div class="bg-blue-200 dark:bg-blue-800 layout-table-section__box layout-table__main">
            main
          </div>


          <template v-if="useFullSlots" #footer>
            <div class="bg-orange-500 layout-table-section__box">
              footer
            </div>
          </template>

          <template #footer-start>
            <div class="bg-lime-500 layout-table-section__box">
              footer-start
            </div>
          </template>

          <template #footer-end>
            <div class="bg-amber-500 layout-table-section__box">
              footer-end
            </div>
          </template>
        </p-layout-table>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import PLayoutTable from '@/layouts/PLayoutTable/PLayoutTable.vue'
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const stickyExampleScrollContainer = ref<HTMLElement>()

  const useFullSlots = ref(false)
</script>

<style>
.layout-table-section__box { @apply
  w-full
  h-12
}

.layout-table__main { @apply
  h-96
}

.layout-table--scrollable { @apply
  overflow-y-auto
  h-64
}
</style>