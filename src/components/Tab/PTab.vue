<template>
  <ul class="p-tab" :class="classes.disabled" role="tablist" aria-label="Tab">
    <li
      :id="slotKeys"
      role="tab"
      :aria-selected="active"
      :aria-controls="`${slotKeys}-panel`"
      tabindex="0"
      class="p-tab__li"
      :class="classes.active"
    >
      <slot />
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  const slots = useSlots()

  const slotKeys = computed(() => {
    if (slots.default) {
      return slots.default()[0].key as string
    }
    return ''
  })

  const props = defineProps<{
    active?: boolean,
    disabled?: boolean,
  }>()

  const classes = computed(() => ({
    active: {
      'p-tab__active': props.active,
    },
    disabled: {
      'p-tab__disabled': props.disabled,
    },
  }))
</script>

<style>
.p-tab { @apply
  cursor-pointer
  border-b
  border-slate-200
}

.p-tab__active { @apply
 border-b-2
 border-prefect-600
 text-prefect-600
}

.p-tab__disabled { @apply
  pointer-events-none
  opacity-50
}

.p-tab__li { @apply
  px-10
  py-4
  text-center
  font-medium
  text-sm
  flex
  items-center
  -mb-0.5
}

.p-tab__li:not(.p-tab__active) { @apply
  border-b-2
  border-transparent
  hover:border-gray-300
  text-gray-500
  hover:text-gray-600
}
</style>