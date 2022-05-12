<template>
  <div class="p-tab" :class="classes.disabled" role="tablist" aria-label="Tabs">
    <button
      :id="slotKeys"
      type="button"
      role="tab"
      :aria-selected="active"
      :aria-controls="`${slotKeys}-panel`"
      :tabindex="setTabIndex"
      class="p-tab__btn"
      :class="classes.active"
    >
      <slot />
    </button>
  </div>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  const slots = useSlots()

  const slotKeys = computed(() => {
    if (slots.default) {
      return String(slots.default()[0].key)
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

  const setTabIndex = computed(() => props.active ? 0 : -1)
</script>

<style>
.p-tab { @apply
  cursor-pointer
  border-b
  border-slate-200
}

.p-tab__active { @apply
 border-b
 border-prefect-600
 text-prefect-600
}

.p-tab__disabled { @apply
  pointer-events-none
  opacity-50
}

.p-tab__btn { @apply
  px-10
  py-4
  text-center
  font-medium
  text-sm
  flex
  items-center
}

.p-tab__btn:not(.p-tab__active) { @apply
  hover:border-gray-300
  text-gray-500
  hover:text-gray-600
}
</style>