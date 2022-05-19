<template>
  <label class="p-label">
    <div class="p-label__text">
      <slot name="label">
        <span>
          {{ label }}
        </span>
      </slot>
    </div>
    <slot />
    <div class="p-label__message">
      <slot name="message">
        <span>
          {{ message }}
        </span>
      </slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
  defineProps<{
    label?: string,
    message?: string,
  }>()
</script>

<style>
.p-label { @apply
  w-full
  text-sm
  font-medium
  text-gray-700
  flex
  flex-col
  gap-y-1
}

.p-label__message { @apply
  text-sm
  text-gray-500
}
</style>