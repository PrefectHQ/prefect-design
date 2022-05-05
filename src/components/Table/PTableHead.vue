<template>
  <thead class="p-table-head">
    <slot>
      <p-table-row>
        <slot name="row" />
      </p-table-row>
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