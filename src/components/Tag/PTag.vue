<template>
  <span
    class="p-tag"
    :class="classes"
  >
    <div v-if="icon" class="p-tag--icon">
      <p-icon :icon="icon" />
    </div>

    <span class="p-tag--label"><slot /></span>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Icon } from '@/types/icon'

  const props = defineProps<{
    flat?: boolean,
    icon?: Icon,
  }>()

  const classes = computed(() => ({
    'p-tag--flat': props.flat,
  }))
</script>

<style>
.p-tag {@apply
  gap-1
  inline-flex
  items-center
  rounded-full
  bg-gray-100
  text-black
  px-2.5
  py-0.5
  text-sm
}
.p-tag--flat {@apply
  bg-transparent
  text-slate-700
  font-semibold
}
.p-tag--icon {@apply
  w-4
  h-4
}
</style>