<template>
  <label class="p-label">
    <div class="p-label-text">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot />
    <div class="p-label__message">
      <slot name="message">
        {{ message }}
      </slot>
    </div>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PLabel',
    expose: [],
    inheritAttrs: false,
  })
</script>

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