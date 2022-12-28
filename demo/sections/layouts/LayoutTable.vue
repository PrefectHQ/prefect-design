<template>
  <ComponentPage title="Table Layout" :demos="[{ title: 'Table Layout' }, { title: 'Sticky Header' }]">
    <template #table-layout>
      <div class="bg-rose-200 layout-table-section__box layout-table--scrollable ">
        <p-checkbox v-model="useFullSlots" label="Use full slots" />

        <p-layout-table class="bg-slate-100">
          <template v-if="useFullSlots" #header>
            <div class="bg-fuchsia-500 layout-table-section__box">
              header
            </div>
          </template>

          <template #header-start>
            <div class="bg-indigo-500 layout-table-section__box">
              header-start
            </div>
          </template>

          <template #header-end>
            <div class="bg-violet-500 layout-table-section__box">
              header-end
            </div>
          </template>

          <div class="bg-rose-500 layout-table-section__box layout-table__main">
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
      <div class="bg-rose-200 layout-table-section__box layout-table--scrollable ">
        <p-checkbox v-model="useFullSlots" label="Use full slots" />

        <p-layout-table class="bg-slate-100" sticky>
          <template v-if="useFullSlots" #header>
            <div class="bg-fuchsia-500 layout-table-section__box">
              header
            </div>
          </template>

          <template #header-start>
            <div class="bg-indigo-500 layout-table-section__box">
              header-start
            </div>
          </template>

          <template #header-end>
            <div class="bg-violet-500 layout-table-section__box">
              header-end
            </div>
          </template>


          <div class="bg-rose-500 layout-table-section__box layout-table__main">
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
  import { ref } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

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