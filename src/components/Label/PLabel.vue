<template>
  <label class="p-label">
    <slot name="label">
      <div class="p-label-text">
        {{ label }}
      </div>
    </slot>
    <slot />
    <slot name="lower-label">
      <div class="p-label__lower-label">
        {{ lowerLabel }}
      </div>
    </slot>
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
    lowerLabel?: string,
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

.p-label__lower-label { @apply
  text-sm
  text-gray-500
}
</style>