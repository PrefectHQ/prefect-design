<template>
  <div class="p-tab">
    <nav class="p-tab__nav" :class="classes" aria-label="Tabs">
      <a class="p-tab__a" :aria-current="isActive">
        <slot>Tab</slot>
      </a>
    </nav>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  const props = defineProps<{
    active?: boolean,
  }>()

  const classes = computed(() => ({
    'p-tab__a-active': props.active,
  }))

  const isActive = computed(() => props.active ? 'page' : undefined)
</script>

<style>
.p-tab { @apply
  inline-flex
}

.p-tab__nav {@apply
  py-4
  border-b-2
border-slate-200
}

.p-tab__nav:not(.p-tab__a-active) {@apply
  hover:border-gray-300
  text-gray-500
  hover:text-gray-600
}

.p-tab__a { @apply
  px-10
  text-center
  font-medium
  text-sm
  cursor-pointer
  inline-flex
  items-center
}

.p-tab__a-active { @apply
 border-prefect-600
 text-prefect-600
}
</style>