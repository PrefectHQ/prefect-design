<template>
  <span class="p-select-option" role="option" :class="classes">
    <template v-if="multiple">
      <p-checkbox :model-value="selected" :disabled="disabled" />
    </template>
    <span class="p-select-option__text">
      <slot>{{ label }}</slot>
    </span>
    <template v-if="selected && !multiple">
      <span class="p-select-option__check">
        <p-icon icon="CheckIcon" />
      </span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import PCheckbox from '@/components/Checkbox/PCheckbox.vue'
  import PIcon from '@/components/Icon/PIcon.vue'

  const props = defineProps<{
    label: string,
    selected: boolean,
    highlighted: boolean,
    multiple?: boolean,
    disabled?: boolean,
  }>()

  const classes = computed(() => ({
    'p-select-option--selected': props.selected,
    'p-select-option--highlighted': props.highlighted,
    'p-select-option--disabled': props.disabled,
  }))
</script>

<style>
.p-select-option { @apply
  text-gray-900
  select-none
  relative
  py-2
  px-3
  font-normal
  text-sm
  flex
  gap-2
  items-center
}

.p-select-option--selected { @apply
  font-semibold
}

.p-select-option--highlighted { @apply
  bg-prefect-100
}

.p-select-option__text { @apply
  flex
  items-center
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

.p-select-option__check .p-icon { @apply
  w-4
  h-4
}

.p-select-option--disabled { @apply
  opacity-50
}

.p-select-option--disabled .p-checkbox { @apply
  opacity-100
}
</style>