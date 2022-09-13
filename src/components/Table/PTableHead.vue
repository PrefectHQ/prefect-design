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
  import PTableRow from './PTableRow.vue'
</script>

<style>
.p-table-head { @apply
  bg-gray-50
}
</style>