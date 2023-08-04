<template>
  <div class="p-empty-results">
    <div class="p-empty-results__message">
      <slot name="message">
        No results
      </slot>
    </div>
    <slot name="actions" />
  </div>
</template>

<style>
.p-empty-results { @apply
  flex
  flex-col
  justify-center
  items-center
  gap-3
  text-center
  text-sm
  p-4
}

.p-empty-results__message { @apply
  text-subdued
}
</style>