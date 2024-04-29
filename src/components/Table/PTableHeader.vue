<template>
  <th class="p-table-header">
    <slot />
  </th>
</template>

<style>
.p-table-header { @apply
  px-3
  py-3
  text-sm
  font-bold
  whitespace-nowrap
  truncate
  text-left
}
</style>