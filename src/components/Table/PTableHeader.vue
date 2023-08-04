<template>
  <th class="p-table-header">
    <slot />
  </th>
</template>

<style>
.p-table-header { @apply
  px-3
  py-3.5
  text-sm
  font-semibold
  whitespace-nowrap
  text-left
}
</style>