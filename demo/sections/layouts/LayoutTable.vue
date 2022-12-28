<template>
  <ComponentPage title="Table Layout" :demos="[{ title: 'Table Layout' }]">
    <template #table-layout>
      <p-checkbox v-model="useFullSlots" label="Use full slots" />

      <p-layout-table class="bg-slate-100">
        <template v-if="useFullSlots" #controls-header>
          <div class="bg-fuchsia-500 layout-table-section__box">
            controls-header
          </div>
        </template>

        <template #controls-header__start>
          <div class="bg-indigo-500 layout-table-section__box">
            controls-header__start
          </div>
        </template>

        <template #controls-header__end>
          <div class="bg-violet-500 layout-table-section__box">
            controls-header__end
          </div>
        </template>

        <div class="bg-rose-500 layout-table-section__box layout-table__main">
          main
        </div>

        <template v-if="useFullSlots" #controls-footer>
          <div class="bg-orange-500 layout-table-section__box">
            controls-footer
          </div>
        </template>

        <template #controls-footer__start>
          <div class="bg-lime-500 layout-table-section__box">
            controls-footer__start
          </div>
        </template>

        <template #controls-footer__end>
          <div class="bg-amber-500 layout-table-section__box">
            controls-footer__end
          </div>
        </template>
      </p-layout-table>
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
  h-24
}
</style>