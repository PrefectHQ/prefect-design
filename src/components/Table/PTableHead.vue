<template>
  <thead class="p-table-head">
    <slot>
      <PTableRow>
        <slot name="row" />
      </PTableRow>
    </slot>
  </thead>
</template>

<script lang="ts" setup>
  import PTableRow from '@/components/Table/PTableRow.vue'
</script>
