<template>
  <td class="p-table-data">
    <slot />
  </td>
</template>

<style>
.p-table-data { @apply
  whitespace-nowrap
  px-3
  py-4
  text-sm
}
</style>