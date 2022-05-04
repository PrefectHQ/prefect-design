<template>
  <span class="p-select-option" role="option" :class="classes">
    <template v-if="multiple">
      <p-checkbox :model-value="selected" />
    </template>
    <template v-else-if="selected">
      <span class="p-select-option__check">
        <CheckIcon />
      </span>
    </template>
    <span class="p-select-option__text">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>

<script lang="ts" setup>
  import CheckIcon from '@heroicons/vue/solid/CheckIcon'
  import { computed } from 'vue'
  import PCheckbox from '@/components/Checkbox'

  const props = defineProps<{
    label: string,
    selected: boolean,
    highlighted: boolean,
    multiple?: boolean,
  }>()

  const classes = computed(() => ({
    'p-select-option--selected': props.selected,
    'p-select-option--highlighted': props.highlighted,
  }))
</script>

<style>
.p-select-option { @apply
  text-gray-900
  cursor-default
  select-none
  relative
  py-2
  pl-3
  pr-9
  font-normal
  text-sm
  flex
  items-center
}

.p-select-option--selected { @apply
  font-semibold
}

.p-select-option--highlighted { @apply
  bg-prefect-100
}

.p-select-option__text { @apply
  block
  truncate
}

/* if label is empty string, ensure equal height */
.p-select-option__text:empty:before {
  content: "\200b";
}

.p-select-option__check { @apply
  text-prefect-600
  flex
  items-center
  pr-1
}

.p-select-option__check svg { @apply
  w-4
  h-4
}
</style>