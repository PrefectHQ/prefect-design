<template>
  <li class="p-select-option" role="option" :class="classes">
    <template v-if="label.length">
      <span class="p-select-option__text">
        {{ label }}
      </span>
    </template>
    <template v-else>
      <span class="p-select-option__text--empty">
        empty
      </span>
    </template>
    <template v-if="selected">
      <span class="p-select-option__check">
        <CheckIcon />
      </span>
    </template>
  </li>
</template>

<script lang="ts" setup>
  import CheckIcon from '@heroicons/vue/solid/CheckIcon'
  import { computed } from 'vue'

  const props = defineProps<{
    label: string,
    selected: boolean,
    highlighted: boolean,
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
}

.p-select-option--selected { @apply
  font-semibold
}

.p-select-option--highlighted { @apply
  bg-prefect-600
  text-white
}

.p-select-option--highlighted .p-select-option__check { @apply
  text-white
}

.p-select-option__text { @apply
  block
  truncate
}

.p-select-option__text--empty { @apply
  block
  italic
  text-gray-400
  font-light
}

.p-select-option__check { @apply
  text-prefect-600
  absolute
  inset-y-0
  right-0
  flex
  items-center
  pr-4
}

.p-select-option__check svg { @apply
  w-4
  h-4
}
</style>